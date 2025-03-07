import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface MenuItem {
  label: string;
  action: () => void;
  href?: string;
}

@customElement('flyout-menu')
export class FlyoutMenu extends LitElement {
  @property({ type: Array }) items: MenuItem[] = [];
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
    }

    .menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      min-width: 150px;
      z-index: 1000;
      display: none;
      margin-top: 4px;
    }

    :host([open]) .menu {
      display: block;
    }

    .menu-item {
      padding: 10px 16px;
      cursor: pointer;
      white-space: nowrap;
      color: #333;
      text-decoration: none;
      display: block;
      font-family: 'Source Sans Pro', sans-serif;
    }

    .menu-item:hover {
      background-color: #FFE0B2;
      color: #FF9800;
    }
  `;

  render() {
    return html`
      <div class="menu">
        ${this.items.map(item => html`
          ${item.href ? 
            html`<a class="menu-item" href=${item.href} @click=${item.action}>${item.label}</a>` :
            html`<div class="menu-item" @click=${item.action}>${item.label}</div>`
          }
        `)}
      </div>
      <slot @click=${this._handleToggle}></slot>
    `;
  }

  _handleToggle(e: Event) {
    e.stopPropagation();
    this.open = !this.open;
    
    // Close the flyout when clicking outside
    if (this.open) {
      setTimeout(() => {
        window.addEventListener('click', this._handleOutsideClick);
      }, 0);
    }
  }

  _handleOutsideClick = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this.open = false;
      window.removeEventListener('click', this._handleOutsideClick);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this._handleOutsideClick);
  }
}
