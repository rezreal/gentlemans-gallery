import {defaultRules, Rules} from "./rules";

type TopicWithMessage = {
  name: string;
  message: string;
  stopMessage?: string;
};


export interface Settings {

  readonly tts: {
    readonly use: boolean;
  }

  readonly mqtt: {
    readonly use: boolean;
    readonly server?: string;
    readonly clientId?: string;
    readonly auth: boolean;
    readonly username?: string;
    readonly password?: string;
    readonly topics: {
      readonly teaseTopic?: TopicWithMessage;
      readonly punishTopic?: TopicWithMessage;
      readonly renewRestraint?: TopicWithMessage;
    };
  };

  readonly buttplug: {
    readonly use: boolean;
    readonly server: string;
  };

  readonly tobii: {
    readonly use: boolean;
    readonly disableMouse: boolean;
    readonly server?: string;
  };

  readonly coyote: {
    readonly use: boolean;
    readonly pairedDeviceId?: string;
  },

  readonly rules: Rules;

}

export const DEFAULT_SETTINGS: Settings = {
  tts: {
    use: false,
  },
  buttplug: {
    use: false,
    server: 'wss://localhost',
  },
  mqtt: {
    use: false,
    server: 'wss://test.mosquitto.org:8081',
    topics: {},
    auth: false,
    ...JSON.parse(localStorage.getItem('mqtt') || '{}'),
  },
  rules: {
    ...defaultRules,
    ...JSON.parse(localStorage.getItem('rules') || '{}'),
  },
  tobii: {
    use: false,
    disableMouse: false,
    server: 'ws://localhost:8887',
    ...JSON.parse(localStorage.getItem('tobii') || '{}')
  },
  coyote: {
    use: false,
    ...JSON.parse(localStorage.getItem('coyote') || '{}')
  },
}
