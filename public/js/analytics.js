(function (window, document) {
  var config = window.GFC_ANALYTICS_CONFIG || {};
  var measurementId = (config.measurementId || '').trim();
  var trackedScrollDepths = {};

  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }

  function pushToDataLayer(payload) {
    window.dataLayer.push(payload);
    if (config.debug && window.console && typeof window.console.debug === 'function') {
      window.console.debug('[GFC analytics]', payload);
    }
  }

  function ensureGtag() {
    if (typeof window.gtag === 'function') {
      return;
    }

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  function ensureGoogleAnalytics() {
    if (!measurementId || document.getElementById('gfc-ga-script')) {
      return;
    }

    ensureGtag();

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    script.id = 'gfc-ga-script';
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: config.autoPageView !== false,
      debug_mode: !!config.debug
    });
  }

  function getPageContext() {
    return {
      page_location: window.location.href,
      page_title: document.title,
      page_path: window.location.pathname + window.location.search
    };
  }

  function trackEvent(category, action, label, extra) {
    var payload = Object.assign({
      event: 'gfc_interaction',
      event_category: category || 'engagement',
      event_action: action || 'unknown_action',
      event_label: label || ''
    }, getPageContext(), extra || {});

    pushToDataLayer(payload);

    if (typeof window.gtag === 'function') {
      window.gtag('event', payload.event_action, Object.assign({
        event_category: payload.event_category,
        event_label: payload.event_label,
        debug_mode: !!config.debug
      }, getPageContext(), extra || {}));
    }

    if (typeof window.CustomEvent === 'function') {
      window.dispatchEvent(new window.CustomEvent('gfc:track', { detail: payload }));
    }

    return payload;
  }

  function handleDocumentClick(event) {
    if (!event.target || typeof event.target.closest !== 'function') {
      return;
    }

    var link = event.target.closest('a[href]');

    if (!link || link.hasAttribute('data-track-action')) {
      return;
    }

    var rawHref = link.getAttribute('href');
    if (!rawHref || rawHref.charAt(0) === '#' || rawHref.indexOf('mailto:') === 0 || rawHref.indexOf('tel:') === 0) {
      return;
    }

    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (error) {
      return;
    }

    if (url.origin !== window.location.origin) {
      trackEvent('navigation', 'outbound_click', url.hostname, {
        link_url: url.href,
        link_text: (link.textContent || '').trim().slice(0, 120)
      });
    }
  }

  function handleScrollDepth() {
    var scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    if (!scrollableHeight) {
      return;
    }

    var scrolledPercentage = Math.round((window.scrollY / scrollableHeight) * 100);

    [25, 50, 75, 90].forEach(function (threshold) {
      if (scrolledPercentage >= threshold && !trackedScrollDepths[threshold]) {
        trackedScrollDepths[threshold] = true;
        trackEvent('engagement', 'scroll_depth', String(threshold), {
          percent_scrolled: threshold,
          non_interaction: true
        });
      }
    });
  }

  ensureGoogleAnalytics();
  ensureGtag();
  document.addEventListener('click', handleDocumentClick, true);
  window.addEventListener('scroll', handleScrollDepth, { passive: true });
  window.addEventListener('load', handleScrollDepth);
  window.gfcTrackEvent = trackEvent;
})(window, document);
