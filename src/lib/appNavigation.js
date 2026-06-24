export const APP_NAVIGATION_EVENT = 'midimily:app-navigation';

export function getCurrentAppPath() {
  if (typeof window === 'undefined') {
    return '/';
  }

  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

export function navigateInApp(to, options = {}) {
  if (typeof window === 'undefined') {
    return false;
  }

  const url = new URL(to, window.location.href);
  if (url.origin !== window.location.origin) {
    return false;
  }

  const nextPath = `${url.pathname}${url.search}${url.hash}`;
  const currentPath = getCurrentAppPath();

  if (nextPath !== currentPath) {
    const method = options.replace ? 'replaceState' : 'pushState';
    window.history[method]({ midimilyNavigation: true }, '', nextPath);
  }

  window.dispatchEvent(
    new CustomEvent(APP_NAVIGATION_EVENT, {
      detail: {
        path: nextPath,
        previousPath: currentPath,
      },
    }),
  );

  return true;
}

export function shouldHandleAppLinkClick(event, anchor) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey ||
    !(anchor instanceof HTMLAnchorElement)
  ) {
    return false;
  }

  if ((anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) {
    return false;
  }

  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) {
    return false;
  }

  return !/\.[a-zA-Z0-9]+$/.test(url.pathname);
}
