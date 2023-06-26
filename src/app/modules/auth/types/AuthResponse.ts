export interface AuthResponse {
    id: number;
    ime: string;
    username: string;
    prezime: string;
    email: string;
    prebivaliste: string;
    jwt: string;
    authorities: string[];
}