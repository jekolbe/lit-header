import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GLOBAL_EVENT_NAMESPACE } from '../globals';

@customElement('header-logo')
export class HeaderLogo extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      height: 100%;
    }
    
    div {
      cursor: pointer;
    }

    svg {
      height: 32px;
      width: auto;
    }
  `;

  private _handleLogoClick() {
    const event = new CustomEvent(GLOBAL_EVENT_NAMESPACE, {
      detail: {
        type: 'clickedLogo'
      }
    });
    window.dispatchEvent(event);
  }

  render() {
    return html`
    <div @click="${this._handleLogoClick}">
      <svg viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="140" height="30" rx="4" ry="4" fill="#FF9800" />
        <text x="75" y="26" font-family="Source Sans Pro, sans-serif" font-size="16" 
              text-anchor="middle" fill="white" font-weight="600">My Cool Inc. Logo</text>
      </svg>
    </div>
    `;
  }
}
