import { defineBoot } from '#q-app/wrappers';
import { Dark } from 'quasar';

const STORAGE_KEY = 'quasar.dark';

export default defineBoot(() => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === 'true' || stored === 'false') {
    Dark.set(stored === 'true');
    return;
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  Dark.set(prefersDark);
});
