export interface ReadResidencyResponse {
  id: number;
  naziv: string;
  lokacija: string;
  pogodnosti: string;
  opis: string;
  minGostiju: number;
  maxGostiju: number;
  prosecnaOcena: number;
  vlasnikID: string;
  baseCena: number;
  tipCene: string;
  finalCena: number;
}
