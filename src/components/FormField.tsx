import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function FormField({ label, hint, id, ...rest }: Props) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="mb-4">
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={fieldId}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        {...rest}
      />
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
