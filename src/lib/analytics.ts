// Lightweight analytics abstraction.
// Falls back to console if no dataLayer or analytics endpoint.
// Extend later to POST to /api/analytics or a provider (Plausible, Umami, etc.).

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  meta?: Record<string, any>;
}

export function trackEvent(evt: AnalyticsEvent) {
  try {
    // Google Tag Manager style
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'custom_event',
        event_category: evt.category,
        event_action: evt.action,
        event_label: evt.label,
        value: evt.value,
        ...evt.meta,
      });
      return;
    }
    // Placeholder for future network call
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(evt) }).catch(()=>{});
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', evt);
    }
  } catch (e) {
    // swallow errors
  }
}

export const trackSocialClick = (platform: string) =>
  trackEvent({ category: 'social', action: 'click', label: platform });

export const trackResumeView = () =>
  trackEvent({ category: 'resume', action: 'view', label: 'google-drive' });
