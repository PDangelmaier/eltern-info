import { useState } from "react";
import type { RegistrationDraft } from "../types";
import { EMPTY_DRAFT, CLUB } from "../types";
import { StepKind } from "./StepKind";
import { StepAdresse } from "./StepAdresse";
import { StepEltern } from "./StepEltern";
import { StepEinwilligung } from "./StepEinwilligung";
import { StepZusammenfassung } from "./StepZusammenfassung";

interface Props {
  initial?: RegistrationDraft;
  onSubmit: (data: RegistrationDraft) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const STEPS = ["Kind", "Adresse", "Eltern / Kontakt", "Einwilligungen", "Zusammenfassung"] as const;

export function PlayerForm({ initial, onSubmit, onCancel, submitLabel = "Anmeldung absenden" }: Props) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RegistrationDraft>(initial ?? { ...EMPTY_DRAFT });

  const update = (partial: Partial<RegistrationDraft>) => setData((d) => ({ ...d, ...partial }));
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    if (!data.einwilligungDsgvo) return;
    onSubmit(data);
  };

  return (
    <div className="max-w-lg mx-auto px-4 pb-8">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-blue-800">{CLUB.name}</h1>
        <p className="text-sm text-gray-500">Spieleranmeldung — {CLUB.verband}</p>
      </div>

      <div className="flex gap-1 mb-6">
        {STEPS.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep(i)}
            className={`flex-1 h-2 rounded-full transition-colors ${
              i <= step ? "bg-blue-600" : "bg-gray-200"
            }`}
            aria-label={label}
          />
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">{STEPS[step]}</h2>

      {step === 0 && <StepKind data={data} update={update} />}
      {step === 1 && <StepAdresse data={data} update={update} />}
      {step === 2 && <StepEltern data={data} update={update} />}
      {step === 3 && <StepEinwilligung data={data} update={update} />}
      {step === 4 && <StepZusammenfassung data={data} />}

      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <button onClick={prev} className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium">
            Zurück
          </button>
        )}
        {onCancel && step === 0 && (
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium">
            Abbrechen
          </button>
        )}
        {step < STEPS.length - 1 && (
          <button onClick={next} className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-medium">
            Weiter
          </button>
        )}
        {step === STEPS.length - 1 && (
          <button
            onClick={handleSubmit}
            disabled={!data.einwilligungDsgvo}
            className="flex-1 py-3 rounded-xl bg-green-600 text-white font-medium disabled:opacity-40"
          >
            {submitLabel}
          </button>
        )}
      </div>
    </div>
  );
}
