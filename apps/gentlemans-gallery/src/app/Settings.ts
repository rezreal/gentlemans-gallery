import { DEFAULT_RULES, Rules } from './rules';

import { XToysConfig } from './xtoys';
import { TobiiConfig } from './TobiiClient';

export interface Settings {
  readonly tts: {
    readonly use: boolean;
  };

  readonly purify: {
    readonly modelUrl: string;
    readonly confidenceThreshold: number;
  };

  readonly xtoys: XToysConfig;

  readonly webgazer: {
    readonly use: boolean;
  };

  readonly tobii: TobiiConfig & { use: boolean };

  readonly rules: Rules;
}

export const DEFAULT_SETTINGS: Settings = {
  tts: {
    use: false,
  },

  purify: {
    modelUrl: './assets/web_model/model.json',
    confidenceThreshold: 0.7,
  },

  xtoys: {
    use: false,
    websocket: '',
    token: '',
    ...JSON.parse(localStorage.getItem('xtoys') || '{}'),
  },
  rules: {
    ...DEFAULT_RULES,
    ...JSON.parse(localStorage.getItem('rules') || '{}'),
  },
  webgazer: {
    use: false,
    ...JSON.parse(localStorage.getItem('webgazer') || '{}'),
  },
  tobii: {
    use: false,
    disableMouse: false,
    server: 'ws://localhost:8887',
    ...JSON.parse(localStorage.getItem('tobii') || '{}'),
  },
};
