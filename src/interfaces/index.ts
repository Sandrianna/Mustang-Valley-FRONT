import {store} from "../store/store.ts"


export type AppDispatch = typeof store.dispatch;

export interface RootState {
  admin: AdminState;
  booking: BookingState;
  profile: ProfileState;
  login: LoginState;
}

export interface GalleryValues {
    images: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface GalleryState {
    gallery: GalleryValues;
}

export interface LoginValues {
    user: {username: string, role: string} |null ;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface LoginState {
    login: LoginValues;
}

export interface ProfileValues {
    profileUser: null | Username;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface ProfileState {
    profile: ProfileValues;
}

export interface SignUpValues {
    regUser: null | string | void;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface SnackbarValues {
    open: boolean;
    message: string;
}

export interface SnackbarState {
    snackbar: SnackbarValues;
}

export interface Booking {
  _id: string;
  userId: string;
  checkInDate: Date;
  checkOutDate: Date;
  option: string;
  adults: number;
  children: number;
  hasPets: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface BookingWithUserDetails {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  checkInDate: Date;
  checkOutDate: Date;
  option: string;
  adults: number;
  children: number;
  hasPets: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingResponse = Booking | BookingWithUserDetails;

export interface BookingState {
  booking: BookingResponse | null;
  bookings: BookingResponse[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  availability: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    isAvailable: boolean;
    error: string | null;
    unavailableDates: Date[];
  };
}

export interface BookingData {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  option: string;
  adults: number;
  children: number;
  hasPets: boolean;
}


export interface ExtendedUserForm {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  gender: "male" | "female";
  password: string;
}

export interface Username {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: "male" | "female";
    avatar?: string;
    favoriteOptions?: string;
    specialWishes?: string;
}



export interface ExtendedUserForm {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  gender: "male" | "female";
  password: string;
}

export interface UsernamePassword extends Username{
    password: string;
    phone: string;

}

export interface SmsValues {
    phone: string;
    code: string;
    sessionId: string | null;
    status: string,
}

export interface SmsState {
    sms: SmsValues;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}


export interface AdminState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}