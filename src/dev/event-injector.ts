/**
 * Development helper that injects test events into the application
 * This file should NOT be included in production builds
 */

// Wait for the custom elements to be defined
window.addEventListener('DOMContentLoaded', () => {
  console.log('🔧 Dev environment: Injecting test events');
  
  // Allow components to initialize
  setTimeout(() => {
    injectHeaderEvents();
    simulateJWT();
  }, 100);
});

function injectHeaderEvents() {
  // Inject navigation items
  const navItemsEvent = new CustomEvent('soka::communication::global', {
    bubbles: true,
    composed: true,
    detail: {
      type: 'setNavItems',
      items: [
        { label: 'Dashboard', url: '#dashboard' },
        { label: 'Dokumente', url: '#dokumente' },
        { label: 'Projekte', url: '#projekte' },
        { label: 'Statistiken', url: '#statistiken' }
      ]
    }
  });
  
  window.dispatchEvent(navItemsEvent);
  console.log('✓ Injected navigation items');
}

function simulateJWT() {
  // Create a simulated JWT with 30 minute expiry
  const now = Math.floor(Date.now() / 1000);
  const expiryTime = now + 30 * 60; // 30 minutes from now
  
  const jwtPayload = {
    exp: expiryTime,
    partnerId: 'P12345',
    name: 'Test User'
  };
  
  // This is NOT a real JWT - just a simulation for development
  const fakeJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(jwtPayload))}.DUMMY_SIGNATURE`;
  
  // Set the JWT cookie
  document.cookie = `auth_token=${fakeJwt};path=/`;
  console.log('✓ Simulated JWT with expiry in 30 minutes');
  
  // Notify about the JWT change
  const jwtEvent = new CustomEvent('soka::communication::global', {
    bubbles: true,
    composed: true,
    detail: {
      type: 'jwtChanged'
    }
  });
  
  window.dispatchEvent(jwtEvent);
}
