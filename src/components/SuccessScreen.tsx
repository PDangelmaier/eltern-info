interface Props {
  playerName: string;
  onDone: () => void;
}

export function SuccessScreen({ playerName, onDone }: Props) {
  return (
    <div className="max-w-lg mx-auto px-4 py-12 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h2 className="text-xl font-bold text-green-700 mb-2">Anmeldung gespeichert!</h2>
      <p className="text-gray-600 mb-6">
        Die Daten für <strong>{playerName}</strong> wurden erfolgreich gespeichert.
        Sie können die Daten jederzeit bearbeiten.
      </p>
      <button onClick={onDone} className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium">
        Zur Übersicht
      </button>
    </div>
  );
}
