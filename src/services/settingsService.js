import {
  db,
  isFirebaseConfigured,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from '../firebase/firestore';

const SETTINGS_DOC_ID = 'business_info';
const LOCAL_STORAGE_KEY = 'da_traders_business_settings';

export const DEFAULT_BUSINESS_SETTINGS = {
  shopName: 'DA Traders',
  address: 'Emmanual Cottage, Myloor, Mannamkonum P.O.',
  primaryPhone: '+91 94976 22571',
  secondaryPhone: '+91 91884 52571',
  whatsappNumber: '+91 94976 22571',
  email: 'donaemmanual347@gmail.com',
  workingHoursWeekday: 'Mon – Sat: 7:30 AM – 9:00 PM',
  workingHoursSunday: 'Sunday: On Request / Appointment',
  googleMapsShareUrl: 'https://share.google/JdaeUc0MMDbNtK5hT',
  announcement: '',
};

function getLocalSettings() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return { ...DEFAULT_BUSINESS_SETTINGS, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT_BUSINESS_SETTINGS;
}

function saveLocalSettings(settings) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  } catch {}
}

export async function getBusinessSettings() {
  if (isFirebaseConfigured && db) {
    try {
      const snap = await getDoc(doc(db, 'settings', SETTINGS_DOC_ID));
      if (snap.exists()) {
        return { ...DEFAULT_BUSINESS_SETTINGS, ...snap.data() };
      }
    } catch (err) {
      console.warn('[SettingsService] Fallback to local settings:', err);
    }
  }
  return getLocalSettings();
}

export async function updateBusinessSettings(data) {
  if (isFirebaseConfigured && db) {
    const ref = doc(db, 'settings', SETTINGS_DOC_ID);
    await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
    return true;
  }

  saveLocalSettings(data);
  return true;
}

