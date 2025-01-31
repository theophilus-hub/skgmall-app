export type ThemeMode = "light" | "dark" | "auto";
export type Theme = {
    primary: string,
    primaryVariant: string,
    onPrimary: string,
    secondary: string,
    secondaryVariant: string
    onSecondary: string,
    surface: string,
    surfaceLow: string,
    surfaceHigh: string,
    onSurface: string
};

export type Credentials = {
    email: string,
    password: string
}

export type RegistrationDetails = {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    phone: string,
    state: string,
    location: string
}

export type Store =  {
    id: number;
    name: string;
    open_time: string;
    close_time: string;
    store_category: string;
    icon_url: string;
    location: string;
    closed: boolean;
    promo?: string
}

export type StoreCategory = {
    id: number;
    name: string;
    uid: string;
}