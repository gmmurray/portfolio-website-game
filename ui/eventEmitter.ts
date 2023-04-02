let instance: UIEventEmitter | null = null;
export class UIEventEmitter extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }

  static getInstance = () => instance ?? new UIEventEmitter();
}
