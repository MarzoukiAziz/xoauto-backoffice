export interface userType {
  _id: string;
  name: string;
  email: string;
  roles: Record<string, any>; // assuming roles is an object with dynamic keys
  phone?: string; // optional
  avatar?: string; // optional
  pro?: boolean; // optional
  email_verified?: boolean; // optional
  phone_number_verified?: boolean; // optional
  favoris?: string[]; // optional array of strings
  deleted: boolean;
  passwordResetToken?: string; // optional
  passwordResetExpires?: Date; // optional
  createdAt?: Date; // added by timestamps
  updatedAt?: Date; // added by timestamps
}
export interface GallaryType {
  id: string;
  cover: string;
  name: string;
  time: string;
}
