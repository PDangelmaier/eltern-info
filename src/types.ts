export interface PlayerRegistration {
  id: string;
  nachname: string;
  vorname: string;
  geburtsdatum: string;
  geschlecht: "m" | "w" | "d";
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  nationalitaet: string;
  geburtsort: string;
  spielberechtigung: "fussball" | "freizeit" | "futsal";
  elternName: string;
  elternEmail: string;
  elternTelefon: string;
  einwilligungDsgvo: boolean;
  einwilligungFoto: boolean;
  einwilligungMarketing: boolean;
  createdAt: string;
  updatedAt: string;
}

export type RegistrationDraft = Omit<PlayerRegistration, "id" | "createdAt" | "updatedAt">;

export const EMPTY_DRAFT: RegistrationDraft = {
  nachname: "",
  vorname: "",
  geburtsdatum: "",
  geschlecht: "m",
  strasse: "",
  hausnummer: "",
  plz: "",
  ort: "",
  nationalitaet: "deutsch",
  geburtsort: "",
  spielberechtigung: "fussball",
  elternName: "",
  elternEmail: "",
  elternTelefon: "",
  einwilligungDsgvo: false,
  einwilligungFoto: false,
  einwilligungMarketing: false,
};

export const CLUB = {
  name: "TV Straßdorf",
  nummer: "35001275",
  verband: "Württembergischer Fußballverband",
} as const;
