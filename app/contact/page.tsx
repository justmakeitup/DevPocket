'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Mail, Send, AlertTriangle, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/providers/ToastProvider';

export default function ContactPage() {
  const router = useRouter();
  const { error: toastError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Feedback & Suggestions',
    subject: '',
    message: '',
    honeypot: '', // invisible honeypot field for bot detection
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide details (at least 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toastError('Please fix the highlighted errors before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirect cleanly to thank-you page without exposing sensitive data in URL
        router.push('/thank-you');
      } else {
        if (data.errors) {
          setErrors(data.errors);
        }
        toastError(data.message || 'Failed to submit form. Please try again.');
      }
    } catch {
      toastError('Network error occurred. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <Breadcrumbs items={[{ name: 'Contact & Feedback', path: '/contact' }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Information */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neon-cyan">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mt-2">
              Contact & Feedback
            </h1>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Have a tool request, bug report, or idea to improve DevPocket? We read every submission and appreciate feedback from the developer community.
            </p>

            <div className="mt-8 space-y-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <Sparkles className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground block">Suggest a New Tool</strong>
                  <span className="text-neutral-500">
                    Tell us what developer utility you find yourself repeatedly searching for.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground block">Responsible Privacy</strong>
                  <span className="text-neutral-500">
                    Contact information is used solely to respond to your inquiry and never shared with marketers.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 font-mono">
            <span>Direct contact email: </span>
            <a
              href="mailto:ranit.das.1321@gmail.com"
              className="text-neon-cyan hover:underline font-semibold"
            >
              ranit.das.1321@gmail.com
            </a>
          </div>
        </div>

        {/* Right Side: Working Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md space-y-5"
          >
            {/* Honeypot field (hidden from visual users) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-xs font-bold text-foreground mb-1.5">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="Ada Lovelace"
                className={`w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-sm text-foreground border ${
                  errors.name ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'
                } focus:outline-none focus:ring-1 focus:ring-neon-cyan`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-xs font-bold text-foreground mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="ada@example.com"
                className={`w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-sm text-foreground border ${
                  errors.email ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'
                } focus:outline-none focus:ring-1 focus:ring-neon-cyan`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="contact-category" className="block text-xs font-bold text-foreground mb-1.5">
                Inquiry Category
              </label>
              <select
                id="contact-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-sm text-foreground border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neon-cyan"
              >
                <option value="Feedback & Suggestions">Tool Request or Idea</option>
                <option value="Bug Report">Bug or Issue Report</option>
                <option value="Partnership & Collaboration">Partnership or Open Source</option>
                <option value="General Inquiry">General Question</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="contact-subject" className="block text-xs font-bold text-foreground mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  if (errors.subject) setErrors({ ...errors, subject: '' });
                }}
                placeholder="Feature request: Cron expression parser"
                className={`w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-sm text-foreground border ${
                  errors.subject ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'
                } focus:outline-none focus:ring-1 focus:ring-neon-cyan`}
              />
              {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold text-foreground mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                placeholder="Describe your request, issue, or feedback in detail..."
                className={`w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 text-sm text-foreground border ${
                  errors.message ? 'border-red-500' : 'border-neutral-200 dark:border-neutral-800'
                } focus:outline-none focus:ring-1 focus:ring-neon-cyan resize-y`}
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-violet text-neutral-950 font-extrabold text-sm shadow-md hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
