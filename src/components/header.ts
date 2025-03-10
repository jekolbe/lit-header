import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { getLocaleFromCookie, setLocale } from '../localization.js';
import './index.js';
import { GLOBAL_EVENT_NAMESPACE } from '../globals/index.js';

@customElement('my-cool-inc-header')
export class Header extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Source Sans Pro', sans-serif;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      background-color: #FFFFFF;
    }

    .header-container {
      display: flex;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
      height: 100%;
      padding: 0 20px;
    }

    .logo-section {
      padding-right: 24px;
      display: flex;
      align-items: center;
    }

    .navigation-section {
      height: 100%;
    }

    .right-section {
      height: 100%;
      padding-left: 24px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // Add the Source Sans Pro font if it's not already on the page
    if (!document.querySelector('link[href*="Source+Sans+Pro"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap';
      document.head.appendChild(link);
    }

    // Initialize the locale from the cookie
    setLocale(getLocaleFromCookie());

    // Listen for global events from parent applications
    window.addEventListener(GLOBAL_EVENT_NAMESPACE, this._handleGlobalEvents);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(GLOBAL_EVENT_NAMESPACE, this._handleGlobalEvents);
  }

  _handleGlobalEvents = (e: Event) => {
    const customEvent = e as CustomEvent;
    // Handle any global events that should be processed at the header level
    if (customEvent.detail?.type === 'headerAction') {
      // Process header-level actions
    }
  };

  render() {
    return html`
      <div class="header-container">
        <div class="logo-section">
          <yes-no></yes-no>
          <header-logo></header-logo>
        </div>
        <div class="navigation-section">
          <header-navigation></header-navigation>
        </div>
        <div class="right-section">
          <header-right-section></header-right-section>
        </div>
      </div>
    `;
  }
}
