import type { RegistrationDraft } from "../types";
import { FormField } from "./FormField";

interface Props {
  data: RegistrationDraft;
  update: (partial: Partial<RegistrationDraft>) => void;
}

export function StepAdresse({ data, update }: Props) {
  return (
    <div>
      <div className="flex gap-3">
        <div className="flex-1">
          <FormField label="Straße" value={data.strasse} onChange={(e) => update({ strasse: e.target.value })} required autoComplete="street-address" />
        </div>
        <div className="w-24">
          <FormField label="Nr." value={data.hausnummer} onChange={(e) => update({ hausnummer: e.target.value })} required />
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-28">
          <FormField label="PLZ" value={data.plz} onChange={(e) => update({ plz: e.target.value })} required inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" />
        </div>
        <div className="flex-1">
          <FormField label="Ort" value={data.ort} onChange={(e) => update({ ort: e.target.value })} required autoComplete="address-level2" />
        </div>
      </div>
    </div>
  );
}
