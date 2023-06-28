export interface AuthResponse {
    id: string;
    ime: string;
    username: string;
    prezime: string;
    email: string;
    prebivaliste: string;
    jwt: string;
    authorities: string[];
}