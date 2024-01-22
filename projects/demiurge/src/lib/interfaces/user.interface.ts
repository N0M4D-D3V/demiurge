export interface DemiUser {
  id?: string;
  email: string;
  passwd: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
}
