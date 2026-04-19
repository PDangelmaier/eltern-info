import { useState, useCallback } from "react";
import type { PlayerRegistration, RegistrationDraft } from "./types";
import { loadRegistrations, saveRegistration, updateRegistration, deleteRegistration } from "./storage";
import { PlayerForm } from "./components/PlayerForm";
import { RegistrationList } from "./components/RegistrationList";
import { SuccessScreen } from "./components/SuccessScreen";

type View = { type: "list" } | { type: "new" } | { type: "edit"; id: string } | { type: "success"; name: string };

function App() {
  const [view, setView] = useState<View>({ type: "list" });
  const [registrations, setRegistrations] = useState<PlayerRegistration[]>(loadRegistrations);

  const refresh = useCallback(() => setRegistrations(loadRegistrations()), []);

  const handleNew = useCallback((data: RegistrationDraft) => {
    saveRegistration(data);
    refresh();
    setView({ type: "success", name: `${data.vorname} ${data.nachname}` });
  }, [refresh]);

  const handleEdit = useCallback((id: string, data: RegistrationDraft) => {
    updateRegistration(id, data);
    refresh();
    setView({ type: "success", name: `${data.vorname} ${data.nachname}` });
  }, [refresh]);

  const handleDelete = useCallback((id: string) => {
    if (confirm("Anmeldung wirklich löschen?")) {
      deleteRegistration(id);
      refresh();
    }
  }, [refresh]);

  if (view.type === "success") {
    return <SuccessScreen playerName={view.name} onDone={() => setView({ type: "list" })} />;
  }

  if (view.type === "new") {
    return <PlayerForm onSubmit={handleNew} onCancel={() => setView({ type: "list" })} />;
  }

  if (view.type === "edit") {
    const reg = registrations.find((r) => r.id === view.id);
    if (!reg) return setView({ type: "list" }) as unknown as null;
    const { id: _, createdAt: __, updatedAt: ___, ...draft } = reg;
    return (
      <PlayerForm
        initial={draft}
        onSubmit={(data) => handleEdit(view.id, data)}
        onCancel={() => setView({ type: "list" })}
        submitLabel="Änderungen speichern"
      />
    );
  }

  return (
    <RegistrationList
      registrations={registrations}
      onEdit={(id) => setView({ type: "edit", id })}
      onDelete={handleDelete}
      onNew={() => setView({ type: "new" })}
    />
  );
}

export default App;
