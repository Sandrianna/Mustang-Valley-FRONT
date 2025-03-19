import {store} from "../store/store.ts"


export type AppDispatch = typeof store.dispatch;

export interface GalleryValues {
    images: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface GalleryState {
    gallery: GalleryValues;
}

export interface LoginValues {
    user: null | string | void;
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

export interface Username {
    username: string;
}

export interface UsernamePassword extends Username{
    password: string;
}