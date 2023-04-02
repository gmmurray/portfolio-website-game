import { CharacterSelector } from '../characterSelect/characterSelector';
import { UIEventEmitter } from '../ui/eventEmitter';

export class SceneConfig {
  constructor(
    public uiEmitter: UIEventEmitter,
    public characterSelector: CharacterSelector,
  ) {}
}
