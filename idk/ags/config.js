import Bar from "./windows/bar/main.js";
import Powermenu from "./windows/powermenu/menu.js";
import ConfirmWindow from "./windows/powermenu/confirm.js";
import NotificationPopup from "./windows/notifications/popups.js";
import NotificationPanel from "./windows/notifications/panel.js";
import AudioSettings from "./windows/widgets/audio.js";
import Settings from "./settings.js";

Utils.monitorFile(
  // directory that contains the scss files
  `${App.configDir}/styles`,

  () => {
    // main scss file
    const scss = `${App.configDir}/styles/main.scss`;

    // target css file
    const css = `${App.configDir}/style.css`;

    // compile, reset, apply
    print(Utils.exec(`sassc ${scss} ${css}`));

    App.resetCss();
    App.applyCss(css);
  },
);

export default {
  style: `${App.configDir}/style.css`,
  windows: [
    Bar(1),
    Powermenu(),
    AudioSettings(),
    ConfirmWindow(),
    NotificationPopup(),
    NotificationPanel(),
  ],

  closeWindowDelay: {
    powermenu: Settings.animationTime,
    "confirm-window": Settings.animationTime,
    "notification-panel": Settings.animationTime,
    "audio-settings": Settings.animationTime,
  },
};
