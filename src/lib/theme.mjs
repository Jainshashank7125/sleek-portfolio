export function normalizeTheme(value) {
  return value === 'dark' ? 'dark' : 'light';
}

export function resolveInitialTheme(storedTheme) {
  return normalizeTheme(storedTheme);
}

export function readStoredTheme(storageFactory) {
  try {
    return resolveInitialTheme(storageFactory().getItem('theme'));
  } catch {
    return 'light';
  }
}

export function persistTheme(storageFactory, theme) {
  const normalizedTheme = normalizeTheme(theme);

  try {
    storageFactory().setItem('theme', normalizedTheme);
  } catch {
    // The in-memory theme still works when storage is blocked or unavailable.
  }

  return normalizedTheme;
}
