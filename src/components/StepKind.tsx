import type { RegistrationDraft } from "../types";
import { FormField } from "./FormField";

interface Props {
  data: RegistrationDraft;
  update: (partial: Partial<RegistrationDraft>) => void;
}

export function StepKind({ data, update }: Props) {
  return (
    <div>
      <FormField label="Nachname" value={data.nachname} onChange={(e) => update({ nachname: e.target.value })} required autoComplete="family-name" />
      <FormField label="Vorname(n)" value={data.vorname} onChange={(e) => update({ vorname: e.target.value })} required autoComplete="given-name" />
      <FormField label="Geburtsdatum" type="date" value={data.geburtsdatum} onChange={(e) => update({ geburtsdatum: e.target.value })} required />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Geschlecht</label>
        <div className="flex gap-3">
          {(["m", "w", "d"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => update({ geschlecht: g })}
              className={`flex-1 py-2.5 rounded-lg border text-center font-medium transition-colors ${
                data.geschlecht === g ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {{ m: "Männlich", w: "Weiblich", d: "Divers" }[g]}
            </button>
          ))}
        </div>
      </div>

      <FormField label="Nationalität" value={data.nationalitaet} onChange={(e) => update({ nationalitaet: e.target.value })} placeholder="deutsch" />

      {data.nationalitaet.toLowerCase() !== "deutsch" && data.nationalitaet !== "" && (
        <FormField label="Geburtsort" value={data.geburtsort} onChange={(e) => update({ geburtsort: e.target.value })} hint="Nur bei nicht-deutscher Nationalität erforderlich" />
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Spielberechtigung</label>
        <div className="flex gap-3">
          {(["fussball", "freizeit", "futsal"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => update({ spielberechtigung: s })}
              className={`flex-1 py-2.5 rounded-lg border text-center font-medium transition-colors text-sm ${
                data.spielberechtigung === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {{ fussball: "Fußball", freizeit: "Freizeit", futsal: "Futsal" }[s]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
