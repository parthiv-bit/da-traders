import {
  db,
  isFirebaseConfigured,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from '../firebase/firestore';

const COLLECTION_NAME = 'subscribers';
const LOCAL_STORAGE_KEY = 'da_traders_subscribers_store';

function getLocalSubscribers() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalSubscribers(items) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function validateSubscriber({ email, consentGiven }) {
  const errors = {};

  if (!email || !email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (!consentGiven) {
    errors.consent = 'You must agree to receive service and workshop updates';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Public: Subscribe to updates
 */
export async function subscribeNewsletter({ email, consentGiven }) {
  const validation = validateSubscriber({ email, consentGiven });
  if (!validation.isValid) {
    const err = new Error('Validation failed');
    err.validationErrors = validation.errors;
    throw err;
  }

  const cleanEmail = email.trim().toLowerCase();

  // Check duplicate in Firestore
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, COLLECTION_NAME), where('email', '==', cleanEmail));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const existingDoc = snapshot.docs[0];
      const existingData = existingDoc.data();
      if (existingData.status === 'unsubscribed') {
        // Reactivate
        await updateDoc(doc(db, COLLECTION_NAME, existingDoc.id), {
          status: 'subscribed',
          resubscribedAt: serverTimestamp(),
        });
        return { message: 'Welcome back! Your subscription has been reactivated.' };
      }
      return { message: 'You are already subscribed to DA Traders updates.' };
    }

    await addDoc(collection(db, COLLECTION_NAME), {
      email: cleanEmail,
      status: 'subscribed',
      consentGiven: true,
      source: 'footer',
      subscribedAt: serverTimestamp(),
    });

    return { message: 'Thank you! You have been subscribed to DA Traders updates.' };
  }

  // Local/Offline fallback
  const current = getLocalSubscribers();
  const existing = current.find((s) => s.email === cleanEmail);
  if (existing) {
    if (existing.status === 'unsubscribed') {
      existing.status = 'subscribed';
      existing.resubscribedAt = new Date().toISOString();
      saveLocalSubscribers(current);
      return { message: 'Welcome back! Your subscription has been reactivated.' };
    }
    return { message: 'You are already subscribed to DA Traders updates.' };
  }

  const newSub = {
    id: `sub-${Date.now()}`,
    email: cleanEmail,
    status: 'subscribed',
    consentGiven: true,
    source: 'footer',
    subscribedAt: new Date().toISOString(),
  };
  saveLocalSubscribers([newSub, ...current]);
  return { message: 'Thank you! You have been subscribed to DA Traders updates.' };
}

/**
 * Admin / Public: Unsubscribe an email
 */
export async function unsubscribeNewsletter(email) {
  const cleanEmail = (email || '').trim().toLowerCase();
  if (!cleanEmail) throw new Error('Email is required to unsubscribe');

  if (isFirebaseConfigured && db) {
    const q = query(collection(db, COLLECTION_NAME), where('email', '==', cleanEmail));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      for (const d of snapshot.docs) {
        await updateDoc(doc(db, COLLECTION_NAME, d.id), {
          status: 'unsubscribed',
          unsubscribedAt: serverTimestamp(),
        });
      }
      return true;
    }
    return false;
  }

  const current = getLocalSubscribers();
  const updated = current.map((s) =>
    s.email === cleanEmail ? { ...s, status: 'unsubscribed', unsubscribedAt: new Date().toISOString() } : s
  );
  saveLocalSubscribers(updated);
  return true;
}

/**
 * Admin: Get all subscribers
 */
export async function getSubscribers() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('subscribedAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          ...d,
          subscribedAt: d.subscribedAt?.toDate ? d.subscribedAt.toDate().toISOString() : d.subscribedAt || new Date().toISOString(),
        };
      });
    } catch (err) {
      console.warn('[NewsletterService] Firestore read fallback:', err);
    }
  }

  return getLocalSubscribers();
}

/**
 * Admin: Delete subscriber
 */
export async function deleteSubscriber(id) {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  }

  const current = getLocalSubscribers();
  saveLocalSubscribers(current.filter((s) => s.id !== id));
  return true;
}

