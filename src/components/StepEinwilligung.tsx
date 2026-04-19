import type { RegistrationDraft } from "../types";

interface Props {
  data: RegistrationDraft;
  update: (partial: Partial<RegistrationDraft>) => void;
}

function Checkbox({ checked, onChange, label, required }: { checked: boolean; onChange: (v: boolean) => void; label: string; required?: boolean }) {
  return (
    <label className="flex items-start gap-3 mb-4 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700 leading-snug">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
    </label>
  );
}

export function StepEinwilligung({ data, update }: Props) {
  return (
    <div>
      <Checkbox
        checked={data.einwilligungDsgvo}
        onChange={(v) => update({ einwilligungDsgvo: v })}
        required
        label="Ich willige ein, dass die erhobenen personenbezogenen Daten zum Zweck der Beantragung einer Spielerlaubnis beim WFV verarbeitet und an den Verband weitergeleitet werden. (DSGVO Art. 6)"
      />
      <Checkbox
        checked={data.einwilligungFoto}
        onChange={(v) => update({ einwilligungFoto: v })}
        label="Ich bin damit einverstanden, dass Fotos meines Kindes im Rahmen der Vereinsarbeit (z.B. Mannschaftsfotos, Spielberichte) veröffentlicht werden dürfen. (freiwillig)"
      />
      <Checkbox
        checked={data.einwilligungMarketing}
        onChange={(v) => update({ einwilligungMarketing: v })}
        label="Ich bin damit einverstanden, über Vereinsaktivitäten, Events und Angebote informiert zu werden. (freiwillig)"
      />

      {!data.einwilligungDsgvo && (
        <p className="text-xs text-red-500 mt-2">Die Datenschutz-Einwilligung ist Pflicht für die Anmeldung.</p>
      )}
    </div>
  );
}
