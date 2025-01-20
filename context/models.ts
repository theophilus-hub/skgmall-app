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