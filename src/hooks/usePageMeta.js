import { useEffect } from 'react';
import { site } from '../config/site';

const setMeta = (selector, attr, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, key, name] = /\[(\w+)="([^"]+)"\]/.exec(selector);
    el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

/** Per-page SEO title and description (BRD §13). */
export function usePageMeta(title, description = site.description) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.fullName}` : `${site.fullName} — ${site.tagline}`;
    document.title = fullTitle;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
  }, [title, description]);
}
