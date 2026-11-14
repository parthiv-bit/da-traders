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
  orderBy,
  serverTimestamp,
} from '../firebase/firestore';

const COLLECTION_NAME = 'inquiries';
const LOCAL_STORAGE_KEY = 'da_traders_inquiries_offline';

// Helper for local mock store when Firebase is not configured
function getLocalInquiries() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalInquiries(items) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

/**
 * Validate inquiry fields
 */
export function validateInquiry({ name, email, phone, inquiryType, message }) {
  const errors = {};

  if (!name || !name.trim()) {
    errors.name = 'Full name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email || !email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (!phone || !phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone.trim().replace(/\s+/g, ''))) {
    errors.phone = 'Please provide a valid phone number (at least 10 digits)';
  }

  if (!inquiryType || !inquiryType.trim()) {
    errors.inquiryType = 'Please select a service or inquiry type';
  }

  if (!message || !message.trim()) {
    errors.message = 'Please provide details about your project or inquiry';
  } else if (message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Submit an inquiry to Firestore
 */
export async function submitInquiry(data) {
  const validation = validateInquiry(data);
  if (!validation.isValid) {
    const err = new Error('Validation failed');
    err.validationErrors = validation.errors;
    throw err;
  }

  const sanitized = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    inquiryType: data.inquiryType.trim(),
    message: data.message.trim(),
    status: 'new',
    source: 'website',
  };

  if (isFirebaseConfigured && db) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...sanitized,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...sanitized };
  }

  // Offline / Demo fallback
  const mockItem = {
    id: `inq-${Date.now()}`,
    ...sanitized,
    createdAt: new Date().toISOString(),
  };
  const current = getLocalInquiries();
  saveLocalInquiries([mockItem, ...current]);
  return mockItem;
}

/**
 * Admin: Get all inquiries
 */
export async function getInquiries() {
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => {
      const d = docSnap.data();
      return {
        id: docSnap.id,
        ...d,
        createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : d.createdAt || new Date().toISOString(),
      };
    });
  }

  return getLocalInquiries();
}

/**
 * Admin: Update inquiry status (e.g. "new", "contacted", "in_progress", "completed", "archived")
 */
export async function updateInquiryStatus(id, newStatus) {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { status: newStatus, updatedAt: serverTimestamp() });
    return true;
  }

  const current = getLocalInquiries();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status: newStatus, updatedAt: new Date().toISOString() } : item
  );
  saveLocalInquiries(updated);
  return true;
}

/**
 * Admin: Delete an inquiry
 */
export async function deleteInquiry(id) {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  }

  const current = getLocalInquiries();
  saveLocalInquiries(current.filter((item) => item.id !== id));
  return true;
}

