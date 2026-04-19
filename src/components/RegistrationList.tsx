import type { PlayerRegistration } from "../types";

interface Props {
  registrations: PlayerRegistration[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

export function RegistrationList({ registrations, onEdit, onDelete, onNew }: Props) {
  return (
    <div className="max-w-lg mx-auto px-4 pb-8">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-blue-800">TV Straßdorf</h1>
        <p className="text-sm text-gray-500">Spieleranmeldung</p>
      </div>

      {registrations.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⚽</div>
          <p className="text-gray-500 mb-6">Noch keine Anmeldungen vorhanden.</p>
          <button onClick={onNew} className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium">
            Kind anmelden
          </button>
        </div>
      ) : (
        <>
          {registrations.map((r) => (
            <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-4 mb-3 text-left">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{r.vorname} {r.nachname}</p>
                  <p className="text-sm text-gray-500">
                    {r.geburtsdatum ? new Date(r.geburtsdatum).toLocaleDateString("de-DE") : ""}
                    {" — "}
                    {{ fussball: "Fußball", freizeit: "Freizeit", futsal: "Futsal" }[r.spielberechtigung]}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(r.id)} className="text-blue-600 text-sm font-medium px-3 py-1 rounded-lg border border-blue-200">
                    Bearbeiten
                  </button>
                  <button onClick={() => onDelete(r.id)} className="text-red-500 text-sm px-2 py-1 rounded-lg border border-red-200">
                    &times;
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Erstellt: {new Date(r.createdAt).toLocaleDateString("de-DE")}
                {r.updatedAt !== r.createdAt && ` — Aktualisiert: ${new Date(r.updatedAt).toLocaleDateString("de-DE")}`}
              </p>
            </div>
          ))}
          <button onClick={onNew} className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium mt-4">
            Weiteres Kind anmelden
          </button>
        </>
      )}
    </div>
  );
}
