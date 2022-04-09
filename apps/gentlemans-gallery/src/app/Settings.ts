import {defaultRules, Rules} from './rules';

import {XToysConfig} from './xtoys';

export interface Settings {
  readonly tts: {
    readonly use: boolean;
  };

  readonly modelUrl: string;

  readonly xtoys: XToysConfig;

  readonly webgazer: {
    readonly use: boolean;
  };

  readonly tobii: {
    readonly use: boolean;
    readonly disableMouse: boolean;
    readonly server?: string;
  };

  readonly coyote: {
    readonly use: boolean;
    readonly pairedDeviceId?: string;
    readonly powerLevel: number;
  };

  readonly rules: Rules;
}

export const DEFAULT_SETTINGS: Settings = {
  tts: {
    use: false,
  },
  modelUrl: "./assets/web_model/model.json",

  xtoys: {
    use: false,
    websocket: '',
    token: '',
    ...JSON.parse(localStorage.getItem('xtoys') || '{}'),
  },
  rules: {
    ...defaultRules,
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
  coyote: {
    use: false,
    powerLevel: 0,
    ...JSON.parse(localStorage.getItem('coyote') || '{}'),
  },
};
