import {
  db,
  isFirebaseConfigured,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from '../firebase/firestore';

const COLLECTION_NAME = 'products';
const LOCAL_STORAGE_KEY = 'da_traders_products_store';

export const INITIAL_SERVICES = [
  {
    id: 'srv-1',
    name: 'Experienced Painters',
    category: 'Painting Service',
    description: 'Skilled professionals for residential and commercial painting.',
    active: true,
  },
  {
    id: 'srv-2',
    name: 'Equipment Rental',
    category: 'Rentals',
    description: 'Compressor machines and other painting equipment for rent.',
    active: true,
  },
  {
    id: 'srv-3',
    name: 'Wall Painting Artists',
    category: 'Artistic Decor',
    description: 'Creative artists for decorative wall paintings and murals.',
    active: true,
  },
  {
    id: 'srv-4',
    name: '3D Wall Art',
    category: 'Artistic Decor',
    description: 'Unique three-dimensional wall designs to transform spaces.',
    active: true,
  },
  {
    id: 'srv-5',
    name: 'Delivery Service',
    category: 'Logistics',
    description: 'Convenient delivery of paint products and accessories directly to your doorstep.',
    active: true,
  },
];

function getLocalProducts() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return INITIAL_SERVICES;
}

function saveLocalProducts(items) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export async function getProductsAndServices() {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, COLLECTION_NAME));
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      }
    } catch (err) {
      console.warn('[ProductService] Fallback to local:', err);
    }
  }
  return getLocalProducts();
}

export async function addProductOrService(data) {
  if (!data.name || !data.name.trim()) throw new Error('Service/Product name is required');

  const item = {
    name: data.name.trim(),
    category: data.category ? data.category.trim() : 'General',
    description: data.description ? data.description.trim() : '',
    active: data.active !== false,
  };

  if (isFirebaseConfigured && db) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...item,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...item };
  }

  const current = getLocalProducts();
  const newItem = { id: `prod-${Date.now()}`, ...item };
  saveLocalProducts([...current, newItem]);
  return newItem;
}

export async function updateProductOrService(id, data) {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
    return true;
  }

  const current = getLocalProducts();
  const updated = current.map((p) => (p.id === id ? { ...p, ...data } : p));
  saveLocalProducts(updated);
  return true;
}

export async function deleteProductOrService(id) {
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  }

  const current = getLocalProducts();
  saveLocalProducts(current.filter((p) => p.id !== id));
  return true;
}

