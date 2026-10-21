import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DevPocket — Every developer tool. One pocket.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#070709',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Ambient neon backdrop glow */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '350px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.25), rgba(139, 92, 246, 0.25))',
            filter: 'blur(80px)',
          }}
        />

        {/* Logo and Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              background: '#0F1016',
              border: '2px solid rgba(0, 240, 255, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.35)',
            }}
          >
            <span style={{ fontSize: '38px', fontWeight: 900, color: '#00F0FF' }}>{`{ }`}</span>
          </div>

          <div style={{ display: 'flex', fontSize: '56px', fontWeight: 900, letterSpacing: '-1.5px' }}>
            <span>Dev</span>
            <span
              style={{
                background: 'linear-gradient(90deg, #00F0FF, #3B82F6, #8B5CF6)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Pocket
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: 800,
            color: '#E2E8F0',
            marginBottom: '14px',
          }}
        >
          Every developer tool. One pocket.
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '20px',
            fontWeight: 400,
            color: '#94A3B8',
            maxWidth: '800px',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Fast, free, and privacy-first developer utilities processed locally in your browser.
        </div>

        {/* Bottom feature badges */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '36px',
          }}
        >
          {['100% Client-Side', 'JSON Formatter', 'Base64', 'Regex Tester', 'UUID v4', 'Diff Checker'].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  padding: '8px 18px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  color: '#00F0FF',
                }}
              >
                {badge}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
