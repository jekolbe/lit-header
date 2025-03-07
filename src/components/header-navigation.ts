import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GLOBAL_EVENT_NAMESPACE } from '../globals';

export interface NavigationItem {
  label: string;
  url: string;
  active?: boolean;
}

@customElement('header-navigation')
export class HeaderNavigation extends LitElement {
  @property({ type: Array }) items: NavigationItem[] = [];

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      height: 100%;
    }

    nav {
      display: flex;
      height: 100%;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 100%;
      color: #333;
      text-decoration: none;
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 16px;
      position: relative;
      transition: color 0.2s ease;
    }

    .nav-item:hover {
      color: #FF9800;
    }

    .nav-item.active {
      color: #FF9800;
    }

    .nav-item.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: #FF9800;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // Listen for navigation items from parent application
    window.addEventListener(GLOBAL_EVENT_NAMESPACE, this._handleNavItemsEvent);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(GLOBAL_EVENT_NAMESPACE, this._handleNavItemsEvent);
  }

  _handleNavItemsEvent = (e: Event) => {
    const customEvent = e as CustomEvent;
    console.log('Received nav items', customEvent);
    if (customEvent.detail?.type === 'setNavItems') {
      this.items = customEvent.detail.items || [];
    }
  };

  render() {
    return html`
      <nav>
        ${this.items.map(item => html`
          <a href="${item.url}" 
             class="nav-item ${item.active ? 'active' : ''}"
          >${item.label}</a>
        `)}
      </nav>
    `;
  }
}
