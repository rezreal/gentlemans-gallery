import { connect } from './mqtt.min';

type TopicWithMessage = {
  readonly name: string;
  readonly message: string;
  readonly stopMessage?: string;
};

export interface MqttSettings {
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
}

export class MqttClient {
  private mqttClient: any | undefined;

  public constructor(private readonly settings: MqttSettings) {}

  onCommandFromMqtt(cmd: string): void {
    console.info('cmd from mqtt: ', cmd);
  }

  public sendMqtt(topic: string, message: string, qos?: 0 | 1 | 2) {
    if (this.mqttClient && this.mqttClient.connected) {
      this.mqttClient.publish(topic, message, { qos: qos ?? 0 });
    }
  }

  public startMqtt() {
    if (this.mqttClient) {
      this.mqttClient.end(true);
      this.mqttClient = undefined;
    }
    this.mqttClient = connect(this.settings.server, {
      username: this.settings.auth ? this.settings.username : undefined,
      password: this.settings.auth ? this.settings.password : undefined,
      clean: true,
      clientId: 'gentlemans-gallery_' + Math.random().toString(16).substr(2, 8),
      /*will: {
        topic: 'gentlemans-gallery/$state',
        payload: 'lost',
        retain: true,
        qos: 1,
      },*/
    });

    this.mqttClient.on('connect', () => {
      //console.info(`connected to ${this.state.mqtt.server}`);
      this.mqttClient.publish('gentlemans-gallery/$state', 'ready', {
        qos: 1,
        retain: true,
      });
    });
    this.mqttClient.on('message', (topic: string) => {
      this.onCommandFromMqtt(topic);
    });

    this.mqttClient.on('error', (c: unknown) => {
      console.error(`mqtt error:`, c);
    });

    this.mqttClient.on('packetsend', (sent: unknown) => {
      console.info('mqtt packet sent: ', sent);
    });
    this.mqttClient.on('packetreceive', (sent: unknown) => {
      console.info('mqtt packet received: ', sent);
    });
  }
}
