import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('logout-timer')
export class LogoutTimer extends LitElement {
  @property({ type: String }) jwtCookieName: string = 'auth_token';
  @state() remainingTime: string = '--:--';
  @state() expiryTimestamp: number = 0;
  private timerInterval: number | undefined;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      font-family: 'Source Sans Pro', sans-serif;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 4px;
      color: #333;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    :host(:hover) {
      background-color: #FFE0B2;
      color: #FF9800;
    }

    .icon {
      margin-right: 6px;
      width: 16px;
      height: 16px;
    }

    .timer {
      font-size: 14px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.startTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }

  getJwtExpiration(): number | null {
    // Get JWT from cookies
    const cookies = document.cookie.split(';');
    const jwtCookie = cookies.find(c => c.trim().startsWith(`${this.jwtCookieName}=`));
    
    if (!jwtCookie) return null;
    
    try {
      const token = jwtCookie.split('=')[1].trim();
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000; // Convert to milliseconds
    } catch (e) {
      console.error('Error parsing JWT', e);
      return null;
    }
  }

  startTimer() {
    const updateTimer = () => {
      const expiry = this.getJwtExpiration();
      
      if (!expiry) {
        this.remainingTime = '--:--';
        return;
      }
      
      this.expiryTimestamp = expiry;
      const now = Date.now(); 
      const diff = expiry - now;
      
      if (diff <= 0) {
        this.remainingTime = '00:00';
        return;
      }
      
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      
      this.remainingTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    updateTimer();
    this.timerInterval = window.setInterval(updateTimer, 1000);
  }

  async sendKeepAlive() {
    try {
      const response = await fetch('/keepalive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        // Refresh the timer
        this.startTimer();
      } else {
        console.error('Failed to refresh session');
      }
    } catch (error) {
      console.error('Error sending keepalive', error);
    }
  }

  render() {
    return html`
      <div @click="${this.sendKeepAlive}">
        <span class="icon">⏱️</span>
        <span class="timer">${this.remainingTime}</span>
      </div>
    `;
  }
}
