import {BehaviorSubject} from "rxjs";

export class TTS {

  private ttsSpeaking$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public createUtterance(
    text: string,
    voice: SpeechSynthesisVoice
  ): SpeechSynthesisUtterance {
    const utterance = new SpeechSynthesisUtterance('hi');
    utterance.lang = 'en-US';
    utterance.voice = voice;
    utterance.onstart = () => this.ttsSpeaking$.next(true);
    utterance.onend = () => this.ttsSpeaking$.next(false);
    utterance.onresume = () => this.ttsSpeaking$.next(true);
    utterance.onpause = () => this.ttsSpeaking$.next(false);
    return utterance;
  }
}

