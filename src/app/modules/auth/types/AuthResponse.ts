export interface AuthResponse {
    id: number;
    ime: string;
    usename: string;
    prezime: string;
    email: string;
    prebivaliste: string;
    jwt: string;
    authorities: string[];
}