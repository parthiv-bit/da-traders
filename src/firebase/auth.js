import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';

// Key for local dev session when Firebase keys aren't configured yet
const DEV_AUTH_KEY = 'da_traders_dev_admin_session';

export async function signInAdmin(email, password) {
  if (isFirebaseConfigured && auth) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  // Fallback demo/dev mode for testing before live credentials are bound
  if (email === 'admin@datraders.com' && password === 'admin1234') {
    const mockUser = {
      uid: 'dev-admin-uid-1',
      email: 'admin@datraders.com',
      displayName: 'DA Traders Administrator (Dev Mode)',
      isDev: true,
    };
    localStorage.setItem(DEV_AUTH_KEY, JSON.stringify(mockUser));
    window.dispatchEvent(new Event('auth-state-change'));
    return mockUser;
  }

  throw new Error('Invalid email or password. (For testing without live Firebase, use admin@datraders.com / admin1234)');
}

export async function signOutAdmin() {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
  localStorage.removeItem(DEV_AUTH_KEY);
  window.dispatchEvent(new Event('auth-state-change'));
}

export function onAuthChange(callback) {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  }

  // Handle local dev session
  const checkDevSession = () => {
    try {
      const stored = localStorage.getItem(DEV_AUTH_KEY);
      callback(stored ? JSON.parse(stored) : null);
    } catch {
      callback(null);
    }
  };

  checkDevSession();
  const listener = () => checkDevSession();
  window.addEventListener('auth-state-change', listener);
  return () => window.removeEventListener('auth-state-change', listener);
}

export async function resetAdminPassword(email) {
  if (isFirebaseConfigured && auth) {
    await sendPasswordResetEmail(auth, email);
    return true;
  }
  return true;
}

