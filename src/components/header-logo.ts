import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('header-logo')
export class HeaderLogo extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      height: 100%;
    }
    
    svg {
      height: 32px;
      width: auto;
    }
  `;

  render() {
    return html`
      <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="110" height="30" rx="4" ry="4" fill="#FF9800" />
        <text x="60" y="26" font-family="Source Sans Pro, sans-serif" font-size="16" 
              text-anchor="middle" fill="white" font-weight="600">SOKA-KUPO</text>
      </svg>
    `;
  }
}
