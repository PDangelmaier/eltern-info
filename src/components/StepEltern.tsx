import type { RegistrationDraft } from "../types";
import { FormField } from "./FormField";

interface Props {
  data: RegistrationDraft;
  update: (partial: Partial<RegistrationDraft>) => void;
}

export function StepEltern({ data, update }: Props) {
  return (
    <div>
      <FormField label="Name Erziehungsberechtigter" value={data.elternName} onChange={(e) => update({ elternName: e.target.value })} required autoComplete="name" />
      <FormField label="E-Mail" type="email" value={data.elternEmail} onChange={(e) => update({ elternEmail: e.target.value })} required autoComplete="email" />
      <FormField label="Telefon" type="tel" value={data.elternTelefon} onChange={(e) => update({ elternTelefon: e.target.value })} autoComplete="tel" hint="Für Rückfragen durch den Verein" />
    </div>
  );
}
