export interface Residency{
    id?: number;
    naziv: string;
    lokacija: string;
    pogodnosti: string;
    opis: string;
    minGostiju: number;
    maxGostiju: number;
    prosecnaOcena?: number;
    baseCena: number;
    totalnaCena?: number;
    tipCene: 'PO_OSOBI' | 'PO_SMESTAJU';
    vlasnikID?: string;
    slike: Array<string>;
}