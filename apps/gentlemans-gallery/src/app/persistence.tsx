import { DEFAULT_SETTINGS, Settings } from './Settings';

export function saveSettings(settings: Settings): void {
  localStorage.setItem('purify', JSON.stringify(settings.purify));
  localStorage.setItem('tobii', JSON.stringify(settings.tobii));
  localStorage.setItem('xtoys', JSON.stringify(settings.xtoys));
  localStorage.setItem('tts', JSON.stringify(settings.tts));
  localStorage.setItem('rules', JSON.stringify(settings.rules));
}

export function loadSettings(): Settings {
  return {
    ...DEFAULT_SETTINGS,

    xtoys: {
      ...DEFAULT_SETTINGS.xtoys,
      ...JSON.parse(localStorage.getItem('xtoys') || '{}'),
    },
    purify: {
      ...DEFAULT_SETTINGS.purify,
      ...JSON.parse(localStorage.getItem('purify') || '{}'),
    },
    rules: {
      ...DEFAULT_SETTINGS.rules,
      ...JSON.parse(localStorage.getItem('rules') || '{}'),
    },
    webgazer: {
      ...DEFAULT_SETTINGS.webgazer,
      ...JSON.parse(localStorage.getItem('webgazer') || '{}'),
    },
    tobii: {
      ...DEFAULT_SETTINGS.tobii,
      ...JSON.parse(localStorage.getItem('tobii') || '{}'),
    },
  };
}
