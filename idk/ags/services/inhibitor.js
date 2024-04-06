import Settings from '../settings.js';

class SwayIdleState extends Service {
  static {
    Service.register(
      this, {},
      { "state": ["boolean", "r"] },
    );
  }

  #stateFile = Settings.idleStateFile;
  #swayIdleCmd = Settings.swayIdleCmd;

  set state(idlestate) {
    Utils.writeFile(`${idlestate}`, this.#stateFile).catch(print);
  }

  get state() {
    const fileOutput = Utils.readFile(this.#stateFile)
    return fileOutput === 'true' ? true : false
  }

  #onChange() {
     if (Utils.exec('sh -c "ps -a | grep swayidle"')) {
        Utils.exec('killall swayidle')
        print("oi i killed swayidle")
    }
    if (this.state) {
      Utils.execAsync(this.#swayIdleCmd).catch(print);
    }

    this.emit("changed");
    this.notify("state");
  }

  constructor() {
    super();

    this.#onChange();
    Utils.monitorFile(this.#stateFile, () => this.#onChange());
  }

  toggleState() {
    this.state = !(this.state)
  }
}

export default new SwayIdleState();
