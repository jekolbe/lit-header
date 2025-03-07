import jwtDecode from 'jwt-decode';
import { JwtPayload } from '../types';

export function decodeJwt(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (e) {
    console.error('Failed to decode JWT:', e);
    return null;
  }
}

export function getTimeUntilExpiration(token: string): number {
  try {
    const decoded = decodeJwt(token);
    if (!decoded?.exp) return 0;
    
    const now = Math.floor(Date.now() / 1000);
    return Math.max(0, decoded.exp - now);
  } catch (e) {
    return 0;
  }
}

export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return '00:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
