import type { RegistrationDraft } from "../types";
import { CLUB } from "../types";

interface Props {
  data: RegistrationDraft;
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between py-1.5 border-b border-gray-100 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium text-right">{value}</span>
    </div>
  );
}

const GESCHLECHT_LABEL = { m: "Männlich", w: "Weiblich", d: "Divers" } as const;
const SPIEL_LABEL = { fussball: "Fußball", freizeit: "Freizeit", futsal: "Futsal" } as const;

export function StepZusammenfassung({ data }: Props) {
  return (
    <div className="text-left">
      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <p className="text-xs text-blue-600 font-medium mb-1">Verein</p>
        <p className="font-semibold text-blue-900">{CLUB.name} ({CLUB.nummer})</p>
      </div>

      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Spieler/in</h3>
      <Row label="Name" value={`${data.vorname} ${data.nachname}`} />
      <Row label="Geburtsdatum" value={data.geburtsdatum ? new Date(data.geburtsdatum).toLocaleDateString("de-DE") : ""} />
      <Row label="Geschlecht" value={GESCHLECHT_LABEL[data.geschlecht]} />
      <Row label="Nationalität" value={data.nationalitaet} />
      {data.geburtsort && <Row label="Geburtsort" value={data.geburtsort} />}
      <Row label="Spielberechtigung" value={SPIEL_LABEL[data.spielberechtigung]} />

      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Adresse</h3>
      <Row label="Straße" value={`${data.strasse} ${data.hausnummer}`} />
      <Row label="PLZ / Ort" value={`${data.plz} ${data.ort}`} />

      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Kontakt</h3>
      <Row label="Erziehungsberechtigter" value={data.elternName} />
      <Row label="E-Mail" value={data.elternEmail} />
      {data.elternTelefon && <Row label="Telefon" value={data.elternTelefon} />}

      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4">Einwilligungen</h3>
      <Row label="Datenschutz (DSGVO)" value={data.einwilligungDsgvo ? "Ja" : "Nein"} />
      <Row label="Foto-Veröffentlichung" value={data.einwilligungFoto ? "Ja" : "Nein"} />
      <Row label="Marketing" value={data.einwilligungMarketing ? "Ja" : "Nein"} />
    </div>
  );
}
