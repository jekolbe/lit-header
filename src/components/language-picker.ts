import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { setLocale } from '../localization.js';
import './flyout-menu';
import { MenuItem } from './flyout-menu';
import { localized } from '@lit/localize';

@customElement('language-picker')
export class LanguagePicker extends LitElement {
  @state() currentLanguage: string = 'DE';
  @state() menuOpen: boolean = false;

  static styles = css`
    :host {
      display: inline-block;
      font-family: 'Source Sans Pro', sans-serif;
    }

    .language-toggle {
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 4px;
      font-weight: 600;
      user-select: none;
      color: #333;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .language-toggle:hover {
      background-color: #FFE0B2;
      color: #FF9800;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadLanguageFromCookie();
  }

  loadLanguageFromCookie() {
    const cookies = document.cookie.split(';');
    const langCookie = cookies.find(c => c.trim().startsWith('sb-kupo-language='));
    
    if (langCookie) {
      const lang = langCookie.split('=')[1].trim();
      if (['DE', 'EN', 'FR'].includes(lang)) {
        this.currentLanguage = lang;
      }
    }
  }

  setLanguage(lang: string) {
    this.currentLanguage = lang;
    
    // Set cookie with 1 year expiry
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);
    document.cookie = `sb-kupo-language=${lang};expires=${expiry.toUTCString()};path=/;`;
    
    // Set the locale for @lit/localize
    setLocale(lang.toLowerCase());
    
    // Dispatch event for parent app to react to language change
    const event = new CustomEvent('soka::communication::global', {
      bubbles: true,
      composed: true,
      detail: {
        type: 'languageChange',
        language: lang
      }
    });
    this.dispatchEvent(event);
  }

  get languageItems(): MenuItem[] {
    return [
      { 
        label: 'Deutsch', 
        action: () => this.setLanguage('DE')
      },
      { 
        label: 'English', 
        action: () => this.setLanguage('EN')
      },
      { 
        label: 'Français', 
        action: () => this.setLanguage('FR')
      }
    ];
  }

  render() {
    return html`
      <flyout-menu .items=${this.languageItems} ?open=${this.menuOpen}>
        <div class="language-toggle">
          ${this.currentLanguage}
        </div>
      </flyout-menu>
    `;
  }
}
