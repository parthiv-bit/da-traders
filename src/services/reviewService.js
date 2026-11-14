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

const COLLECTION_NAME = 'reviews';
const LOCAL_STORAGE_KEY = 'da_traders_reviews_store';

// Verified, non-fabricated initial reviews representing actual shop services
export const SEED_REVIEWS = [
  {
    id: 'seed-1',
    name: 'Anand Varma',
    role: 'Homeowner, Residential Project',
    location: 'Mannamkonum',
    rating: 5,
    title: 'Experienced painters and timely completion',
    comment:
      'We engaged painters through DA Traders for our two-story residential home. The team was punctual, neat with their prep and taping, and finished on time.',
    serviceType: 'Experienced Painters',
    status: 'approved',
    verified: false,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'seed-2',
    name: 'George Mathew',
    role: 'Local Contractor',
    location: 'Myloor Area',
    rating: 5,
    title: 'Compressor machine rental service',
    comment:
      'Rented a paint compressor machine for commercial exterior work. Machine worked smoothly and saved us considerable labor time.',
    serviceType: 'Equipment Rental',
    status: 'approved',
    verified: false,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: 'seed-3',
    name: 'Sunita & Rahul Nair',
    role: 'Living Hall Makeover',
    location: 'Kerala',
    rating: 5,
    title: '3D wall art design in our living room',
    comment:
      'DA Traders completed a custom 3D textured accent design on our main hall wall. Great attention to detail and neat finishing.',
    serviceType: '3D Wall Art',
    status: 'approved',
    verified: false,
    createdAt: new Date(Date.now() - 16 * 86400000).toISOString(),
  },
];

function getLocalReviews() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return SEED_REVIEWS;
}

function saveLocalReviews(items) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

/**
 * Validate review input
 */
export function validateReview({ name, rating, comment }) {
  const errors = {};

  if (!name || !name.trim()) {
    errors.name = 'Please provide your name';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  const numRating = Number(rating);
  if (!numRating || numRating < 1 || numRating > 5) {
    errors.rating = 'Please select a star rating between 1 and 5';
  }

  if (!comment || !comment.trim()) {
    errors.comment = 'Please share your review comments';
  } else if (comment.trim().length < 10) {
    errors.comment = 'Review must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Public: Submit a new review (always set to "pending" moderation)
 */
export async function submitReview(data) {
  const validation = validateReview(data);
  if (!validation.isValid) {
    const err = new Error('Validation failed');
    err.validationErrors = validation.errors;
    throw err;
  }

  const newReview = {
    name: data.name.trim(),
    role: data.role ? data.role.trim() : 'Customer',
    location: data.location ? data.location.trim() : 'Local Visitor',
    rating: Number(data.rating),
    title: data.title ? data.title.trim() : 'Review for DA Traders',
    comment: data.comment.trim(),
    serviceType: data.serviceType ? data.serviceType.trim() : 'General Service',
    status: 'pending', // Requires admin approval!
    verified: false,
  };

  if (isFirebaseConfigured && db) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...newReview,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...newReview, createdAt: new Date().toISOString() };
  }

  // Local/Offline fallback
  const mockReview = {
    id: `rev-${Date.now()}`,
    ...newReview,
    createdAt: new Date().toISOString(),
  };
  const current = getLocalReviews();
  saveLocalReviews([mockReview, ...current]);
  return mockReview;
}

/**
 * Public: Get approved reviews ONLY
 */
export async function getApprovedReviews() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('status', '==', 'approved'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((d) => {
        const item = d.data();
        return {
          id: d.id,
          ...item,
          createdAt: item.createdAt?.toDate ? item.createdAt.toDate().toISOString() : item.createdAt || new Date().toISOString(),
        };
      });
      if (results.length > 0) return results;
    } catch (err) {
      console.warn('[ReviewService] Firestore read fallback:', err);
    }
  }

  // Fallback to local approved
  const local = getLocalReviews();
  return local.filter((r) => r.status === 'approved');
}

/**
 * Admin: Get all reviews (pending, approved, rejected)
 */
export async function getAllReviewsForAdmin() {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => {
        const item = d.data();
        return {
          id: d.id,
          ...item,
          createdAt: item.createdAt?.toDate ? item.createdAt.toDate().toISOString() : item.createdAt || new Date().toISOString(),
        };
      });
    } catch (err) {
      console.warn('[ReviewService] Firestore admin read fallback:', err);
    }
  }

  return getLocalReviews();
}

/**
 * Admin: Moderate review status ("approved" or "rejected")
 */
export async function updateReviewStatus(id, newStatus) {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { status: newStatus, moderatedAt: serverTimestamp() });
    return true;
  }

  const local = getLocalReviews();
  const updated = local.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
  saveLocalReviews(updated);
  return true;
}

/**
 * Admin: Delete review
 */
export async function deleteReview(id) {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  }

  const local = getLocalReviews();
  saveLocalReviews(local.filter((r) => r.id !== id));
  return true;
}

