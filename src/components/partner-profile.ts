import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import './index';
import {MenuItem} from './flyout-menu';

@customElement('partner-profile')
@localized()
export class PartnerProfile extends LitElement {
  @property({ type: String }) partnerId: string = '';
  @state() menuOpen: boolean = false;

  static styles = css`
    :host {
      display: inline-block;
      font-family: 'Source Sans Pro', sans-serif;
    }

    .profile-toggle {
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      color: #333;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .profile-toggle:hover {
      background-color: #FFE0B2;
      color: #FF9800;
    }

    .icon {
      margin-right: 6px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // Listen for JWT updates to extract partner ID
    window.addEventListener('soka::communication::global', this._handleJwtEvent);
    this.extractPartnerIdFromJwt();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('soka::communication::global', this._handleJwtEvent);
  }

  _handleJwtEvent = (e: Event) => {
    const customEvent = e as CustomEvent;
    if (customEvent.detail?.type === 'jwtChanged') {
      this.extractPartnerIdFromJwt();
    }
  };

  extractPartnerIdFromJwt() {
    const cookies = document.cookie.split(';');
    const jwtCookie = cookies.find(c => c.trim().startsWith('auth_token='));
    
    if (jwtCookie) {
      try {
        const token = jwtCookie.split('=')[1].trim();
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.partnerId = payload.partnerId || '';
      } catch (e) {
        console.error('Error extracting partner ID from JWT', e);
      }
    }
  }

  async logout() {
    try {
      await fetch('/abmelden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      // Dispatch event for parent app
      const event = new CustomEvent('soka::communication::global', {
        bubbles: true,
        composed: true,
        detail: {
          type: 'logoutSuccess'
        }
      });
      this.dispatchEvent(event);
      
      // Optionally redirect to login page
      // window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout', error);
    }
  }

  get profileItems(): MenuItem[] {
    return [
      { 
        label: msg('Profil'), 
        action: () => {
          this.menuOpen = false;
        },
        href: '/profile'
      },
      { 
        label: msg('Hilfe & Kontakt'), 
        action: () => {
          this.menuOpen = false;
        },
        href: '/help'
      },
      { 
        label: msg('Abmelden'), 
        action: () => {
          this.logout();
          this.menuOpen = false;
        }
      }
    ];
  }

  render() {
    return html`
      <flyout-menu .items=${this.profileItems} ?open=${this.menuOpen}>
        <div class="profile-toggle">
          <span class="icon">👤</span>
          ${this.partnerId || msg('Benutzer')}
        </div>
      </flyout-menu>
    `;
  }
}
