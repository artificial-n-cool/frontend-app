export interface Promotion {
    id?: string;
    datumOd: string;
    datumDo: string;
    procenat: number;
    dani: Array<number>;
    smestajId?: string;
}