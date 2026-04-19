import type { PlayerRegistration, RegistrationDraft } from "./types";

const STORAGE_KEY = "tvstrassdorf_registrations";

export function loadRegistrations(): PlayerRegistration[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRegistration(draft: RegistrationDraft): PlayerRegistration {
  const registrations = loadRegistrations();
  const now = new Date().toISOString();
  const entry: PlayerRegistration = {
    ...draft,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  registrations.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  return entry;
}

export function updateRegistration(id: string, draft: RegistrationDraft): PlayerRegistration {
  const registrations = loadRegistrations();
  const idx = registrations.findIndex((r) => r.id === id);
  if (idx === -1) throw new Error(`Registration ${id} not found`);

  const updated: PlayerRegistration = {
    ...draft,
    id,
    createdAt: registrations[idx].createdAt,
    updatedAt: new Date().toISOString(),
  };
  registrations[idx] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  return updated;
}

export function deleteRegistration(id: string): void {
  const registrations = loadRegistrations().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
}
