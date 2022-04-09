import { DetectionType } from './model';
import { RegionType } from './rules';

export interface XToysConfig {
  readonly use: boolean;
  readonly websocket: string;
  readonly token: string;
}

export type XToysCommand = {};

export type XToysEvent = LookAt | Punish;

export interface Punish {
  type: 'punish';
  severity: 'hard' | 'soft';
}

export interface LookAt {
  type: 'lookAt';
  detection: DetectionType;
  region: RegionType;
}

export class XToysClient {
  private ws?: WebSocket;
  public constructor(private readonly config: XToysConfig) {}

  public sendXToys(evt: XToysEvent): void {
    this.ws?.send(JSON.stringify(evt));
  }

  public startXToys(): void {
    this.ws = new WebSocket(
      `wss://webhook.xtoys.app/${this.config.websocket}?token=${this.config.token}`
    );
    this.ws.onopen = () => {
      console.info('YAY, connected to xtoys');
    };

    this.ws.onmessage = (m) => {
      console.info('message from xtoys:', JSON.parse(m.data));
    };
  }
}
