export interface UserType {
  _id: string;
  name: string;
  email: string;
  roles: Record<string, any>;
  phone?: string;
  avatar?: string;
  pro?: boolean;
  email_verified?: boolean;
  phone_number_verified?: boolean;
  favoris?: string[];
  deleted: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}
export interface GallaryType {
  id: string;
  cover: string;
  name: string;
  time: string;
}
