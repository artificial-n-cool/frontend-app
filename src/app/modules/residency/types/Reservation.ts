export interface Reservation {
    id?: string;
    brojOsoba: number;
    datumOd: string;
    datumDo: string;
    statusRezervacije: 'U_OBRADI' | 'PRIHVACENO' | 'ODBIJENO' | 'OTKAZANO';
    korisnikID: string;
    smestajID: string;
    smestajNaziv?: string;
}