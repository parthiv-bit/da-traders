import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './firebase';

export async function uploadImage(file, path) {
  if (!isFirebaseConfigured || !storage) {
    // If Firebase Storage is not configured, generate a mock or object URL
    return URL.createObjectURL(file);
  }
  const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
}

export async function deleteImage(fileUrl) {
  if (!isFirebaseConfigured || !storage || !fileUrl.startsWith('gs://')) {
    return true;
  }
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
    return true;
  } catch (err) {
    console.warn('[Storage] Delete error:', err);
    return false;
  }
}

