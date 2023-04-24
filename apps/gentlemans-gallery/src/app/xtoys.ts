import { DetectionType } from './PurifyModel';
import { RegionType } from './rules';

export interface XToysConfig {
  readonly use: boolean;
  readonly websocket: string;
  readonly token: string;
}

export type XToysCommand = unknown;

export type XToysEvent = { key: string, value: string };

export interface Punish {
  key: 'punish';
  severity: 'hard' | 'soft';
}

export interface Won {
  type: 'won';
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
    console.info("sending", evt)
    this.ws?.send(JSON.stringify(evt)+"\n");
  }

  public stop(): void {
    console.info("closing xtoys socket")
    this.ws?.close(1001, "Going Away")
  }

  public start(): void {
    this.ws = new WebSocket(
      `wss://webhook.xtoys.app/${this.config.websocket}?token=${this.config.token}`
    );

    this.ws.onopen = () => {
      console.info('YAY, connected to xtoys');
      this.ws?.send(JSON.stringify({success: true })+"\n");
    };

    this.ws.onmessage = (m) => {
      // todo: await { 'success': true }
      console.info('message from xtoys:', JSON.parse(m.data));
    };
  }
}
