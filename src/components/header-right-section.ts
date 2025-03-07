import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import './logout-timer';
import './language-picker';
import './partner-profile';

@customElement('header-right-section')
@localized()
export class HeaderRightSection extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
      padding: 4px 0;
    }

    .top-row {
      display: flex;
      justify-content: flex-end;
      padding-bottom: 8px;
    }

    .bottom-row {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .mailbox {
      cursor: pointer;
      font-family: 'Source Sans Pro', sans-serif;
      padding: 6px 10px;
      border-radius: 4px;
      color: #333;
      display: flex;
      align-items: center;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .mailbox:hover {
      background-color: #FFE0B2;
      color: #FF9800;
    }

    .icon {
      margin-right: 6px;
    }
  `;

  handleMailboxClick() {
    // Dispatch event for parent app
    const event = new CustomEvent('soka::communication::global', {
      bubbles: true,
      composed: true,
      detail: {
        type: 'navigateToMailbox'
      }
    });
    this.dispatchEvent(event);
    
    // Or navigate directly
    // window.location.href = '/mailbox';
  }

  render() {
    return html`
      <div class="top-row">
        <logout-timer></logout-timer>
      </div>
      <div class="bottom-row">
        <language-picker></language-picker>
        <div class="mailbox" @click=${this.handleMailboxClick}>
          <span class="icon">📥</span>
          <span>${msg('Postfach')}</span>
        </div>
        <partner-profile></partner-profile>
      </div>
    `;
  }
}
