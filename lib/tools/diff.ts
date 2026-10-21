import * as Diff from 'diff';

export interface DiffOptions {
  ignoreWhitespace?: boolean;
  ignoreCase?: boolean;
}

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
  originalLineNumber?: number;
  modifiedLineNumber?: number;
}

export interface DiffStats {
  additions: number;
  deletions: number;
  unchanged: number;
  totalOriginalLines: number;
  totalModifiedLines: number;
}

export interface DiffResult {
  lines: DiffLine[];
  stats: DiffStats;
  unifiedPatch: string;
}

export function computeDiff(
  originalText: string,
  modifiedText: string,
  options: DiffOptions = {}
): DiffResult {
  const diffParts = Diff.diffLines(originalText, modifiedText, {
    ignoreWhitespace: options.ignoreWhitespace,
    ignoreCase: options.ignoreCase,
  });

  const lines: DiffLine[] = [];
  let additions = 0;
  let deletions = 0;
  let unchanged = 0;
  let origLineNum = 1;
  let modLineNum = 1;

  for (const part of diffParts) {
    // split lines preserving content
    const partLines = part.value.split('\n');
    // trailing newline causes an extra empty string from split if it ends with \n
    if (partLines.length > 1 && partLines[partLines.length - 1] === '') {
      partLines.pop();
    }

    for (const lineText of partLines) {
      if (part.added) {
        additions++;
        lines.push({
          type: 'added',
          value: lineText,
          modifiedLineNumber: modLineNum++,
        });
      } else if (part.removed) {
        deletions++;
        lines.push({
          type: 'removed',
          value: lineText,
          originalLineNumber: origLineNum++,
        });
      } else {
        unchanged++;
        lines.push({
          type: 'unchanged',
          value: lineText,
          originalLineNumber: origLineNum++,
          modifiedLineNumber: modLineNum++,
        });
      }
    }
  }

  const patch = Diff.createPatch('file.txt', originalText, modifiedText, 'Original', 'Modified');

  return {
    lines,
    stats: {
      additions,
      deletions,
      unchanged,
      totalOriginalLines: originalText ? originalText.split('\n').length : 0,
      totalModifiedLines: modifiedText ? modifiedText.split('\n').length : 0,
    },
    unifiedPatch: patch,
  };
}

export const SAMPLE_ORIGINAL_DIFF = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

console.log("Processing order...");
`;

export const SAMPLE_MODIFIED_DIFF = `function calculateTotal(items, discountRate = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const discount = subtotal * discountRate;
  return Math.max(0, subtotal - discount);
}

console.log("Processing secure order in DevPocket...");
`;
