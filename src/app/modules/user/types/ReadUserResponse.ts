export interface ReadUserResponse {
    id: number;
    ime: string;
    usename: string;
    prezime: string;
    email: string;
    prebivaliste: string;
    jwt: string;
    authorities: string[];
    type: String
}