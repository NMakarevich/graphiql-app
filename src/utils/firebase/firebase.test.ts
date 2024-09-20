import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  getCurrentUser,
  logout,
} from './firebase';
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  signOut,
} from 'firebase/auth';
import {
  Query,
  DocumentData,
  QuerySnapshot,
  DocumentReference,
  Firestore,
  CollectionReference,
  SnapshotMetadata,
  QueryConstraint,
  QueryDocumentSnapshot,
  getDocs,
} from 'firebase/firestore';

vi.mock('firebase/auth', () => {
  const mockGoogleAuthProvider = {
    credentialFromResult: vi.fn(),
    credentialFromError: vi.fn(),
  };
  const mockAuth = {
    currentUser: {
      uid: '123',
      getIdToken: vi.fn().mockResolvedValue('token'),
    },
  };
  return {
    getAuth: vi.fn(() => mockAuth),
    signInWithPopup: vi.fn(),
    signInWithRedirect: vi.fn(),
    getRedirectResult: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn(),
    GoogleAuthProvider: vi.fn(() => mockGoogleAuthProvider),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    updateProfile: vi.fn(),
    credentialFromResult: vi.fn(),
    credentialFromError: vi.fn(),
  };
});

interface MockDocument {
  id: string;
  data: () => DocumentData;
}

const mockDocs: MockDocument[] = [];
const mockQuery = {} as Query<DocumentData>;

const mockMetadata: SnapshotMetadata = {
  hasPendingWrites: false,
  fromCache: true,
  isEqual: function (): boolean {
    return true;
  },
};

const mockQuerySnapshot: QuerySnapshot<DocumentData> = {
  docs: mockDocs as QueryDocumentSnapshot<DocumentData, DocumentData>[],

  metadata: mockMetadata,
  query: mockQuery,
  size: mockDocs.length,
  empty: mockDocs.length === 0,
  forEach: vi.fn((callback: (doc: MockDocument) => void) => {
    mockDocs.forEach((doc) => callback(doc));
  }),
  docChanges: vi.fn(),
};

const mockDocRef = {} as DocumentReference<DocumentData>;
const mockCollectionRef = {} as CollectionReference<DocumentData>;

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({}) as Firestore),
  query: vi.fn(() => mockQuery),
  getDocs: vi.fn(() => Promise.resolve(mockQuerySnapshot)),
  collection: vi.fn(() => mockCollectionRef),
  where: vi.fn(() => [] as QueryConstraint[]),
  addDoc: vi.fn(() => Promise.resolve(mockDocRef)),
  updateDoc: vi.fn(() => Promise.resolve()),
  doc: vi.fn(() => mockDocRef),
}));

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Firebase Authentication Functions: ', () => {
  it('- should handle signInWithGoogle correctly', async () => {
    const mockUser = {
      uid: '123',
      displayName: 'John Doe',
      email: 'john@example.com',
      getIdToken: vi.fn().mockResolvedValue('token'),
    };
    const mockResult = {
      user: mockUser,
    } as unknown as UserCredential;

    vi.mocked(signInWithPopup).mockResolvedValue(mockResult);

    const result = await signInWithGoogle();

    expect(result).toEqual({ user: mockUser, token: 'token' });
    expect(signInWithPopup).toHaveBeenCalledWith(auth, googleProvider);
    expect(result).toEqual({ user: mockUser, token: 'token' });
    expect(signInWithPopup).toHaveBeenCalledWith(auth, googleProvider);
  });

  it('- should handle logInWithEmailAndPassword correctly', async () => {
    const mockUser = {
      uid: '123',
      getIdToken: vi.fn().mockResolvedValue('token'),
    };
    const mockResult = {
      user: mockUser,
    } as unknown as UserCredential;

    vi.mocked(signInWithEmailAndPassword).mockResolvedValue(mockResult);

    const result = await logInWithEmailAndPassword(
      'email@example.com',
      'password'
    );
    expect(result).toEqual({ user: mockUser, token: 'token' });
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'email@example.com',
      'password'
    );
  });

  it('- should handle signUpWithEmailAndPassword correctly', async () => {
    const mockUser = {
      uid: '123',
      getIdToken: vi.fn().mockResolvedValue('token'),
      updateProfile: vi.fn(),
    };
    const mockResult = {
      user: mockUser,
    } as unknown as UserCredential;
    vi.mocked(createUserWithEmailAndPassword).mockResolvedValue(mockResult);

    const result = await signUpWithEmailAndPassword(
      'John Doe',
      'email@example.com',
      'password'
    );
    expect(result).toEqual(mockUser);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      'email@example.com',
      'password'
    );
  });

  it('- should handle errors during logout function', async () => {
    const mockDocs = [{ id: 'user-doc-id', data: () => ({}) }];
    vi.mocked(getDocs).mockResolvedValue({
      docs: mockDocs as QueryDocumentSnapshot<unknown, DocumentData>[],
      metadata: {
        hasPendingWrites: false,
        fromCache: true,
        isEqual: vi.fn(() => true),
      },
      query: {} as Query<unknown, DocumentData>,
      size: mockDocs.length,
      empty: mockDocs.length === 0,
      forEach: vi.fn((callback) => mockDocs.forEach(callback)),
      docChanges: vi.fn(),
    });
    vi.mocked(signOut).mockRejectedValue(new Error('Sign out error'));

    await expect(logout()).rejects.toThrow('Sign out error');
  });

  it('- should handle errors correctly', async () => {
    const mockError = new Error('Auth error');
    vi.mocked(onAuthStateChanged).mockImplementation(
      (_auth, _callback, errorCallback) => {
        errorCallback?.(mockError);
        return () => {};
      }
    );

    await expect(getCurrentUser()).rejects.toThrow('Auth error');
  });
});
