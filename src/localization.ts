import { configureLocalization } from '@lit/localize';
import { sourceLocale, targetLocales } from '../locales/locale-codes';

// Initialize the localization configuration with dynamic loading
export const { getLocale, setLocale, } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`../locales/${locale}.js`)
});

/**
 * Helper to get locale from cookie
 * Converts from cookie format (DE) to locale format (de)
 */
export function getLocaleFromCookie(): string {
  const cookies = document.cookie.split(';');
  const langCookie = cookies.find(c => c.trim().startsWith('sb-kupo-language='));
  
  if (langCookie) {
    const lang = langCookie.split('=')[1].trim();
    // Convert cookie format (DE) to locale format (de)
    return lang.toLowerCase();
  }
  
  return sourceLocale; // Return default locale if not found
}

// Try to set initial locale but don't fail if locale files aren't generated yet
try {
  setLocale(getLocaleFromCookie());
} catch (e) {
  console.warn('Failed to set initial locale - this is expected during first build', e);
}
