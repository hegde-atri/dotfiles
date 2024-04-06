import Popups from "../popups.js";
import Settings from "../../settings.js";

const Audio = await Service.import("audio");

class AudioSettings extends Service {
  static {
    Service.register(this, {}, { "current-page": ["string", "r"] });
  }

  #currentPage = "input";
  #windowName = "audio-settings";

  toggle(pageName) {
    if (pageName === this.#currentPage) {
      App.toggleWindow(this.#windowName);
      return;
    }
    this.#currentPage = pageName;
    this.emit("changed");
    this.notify("current-page");
    App.openWindow(this.#windowName);
    return `Current Page ${pageName}`;
  }

  get current_page() {
    return this.#currentPage;
  }
}

const audioSettings = new AudioSettings();
globalThis["audioSettings"] = audioSettings;

const iconSubstitute = (item, type) => {
  const microphoneSubstitutes = {
    "audio-headset-analog-usb": "audio-headset-symbolic",
    "audio-headset-bluetooth": "audio-headphones-symbolic",
    "audio-card-analog-usb": "audio-input-microphone-symbolic",
    "audio-card-analog-pci": "audio-input-microphone-symbolic",
    "audio-card-analog": "audio-input-microphone-symbolic",
    "camera-web-analog-usb": "camera-web-symbolic",
  };
  const substitues = {
    "audio-headset-bluetooth": "audio-headphones-symbolic",
    "audio-card-analog-usb": "audio-speakers-symbolic",
    "audio-card-analog-pci": "audio-speakers-symbolic",
    "audio-card-analog": "audio-speakers-symbolic",
    "audio-headset-analog-usb": "audio-headset-symbolic",
  };

  if (type === "speaker") {
    return substitues[item] || item;
  }
  return microphoneSubstitutes[item] || item;
};

const StreamSelector = (stream) =>
  Widget.Box({
    vertical: true,
    setup: (box) => {
      const streamList = Widget.Box({
        vertical: true,
        className: "audio-stream-selector",
        children: Audio.bind(`${stream}s`).as((strms) =>
          strms.map((strm) =>
            Widget.Button({
              cursor: "pointer",
              child: Widget.Box(),
              onPrimaryClick: () => (Audio[stream] = strm),
              setup: (self) => {
                self.child.add(
                  Widget.Icon(iconSubstitute(strm.iconName, stream)),
                );
                self.child.add(
                  Widget.Label({
                    hpack: "start",
                    hexpand: true,
                    label: strm.description.split(" ").slice(0, 5).join(" "),
                  }),
                );
                self.child.add(
                  Widget.Icon({
                    hpack: "end",
                    icon: Audio[stream]
                      .bind("id")
                      .as((id) =>
                        id === strm.id ? "object-select-symbolic" : "",
                      ),
                  }),
                );
              },
            }),
          ),
        ),
      });

      const streamListRevealer = Widget.Revealer({
        transition: "slide_down",
        transitionDuration: Settings.animationTime,
        child: streamList,
      });

      const header = Widget.EventBox({
        child: Widget.Box({
          className: "current-audio-stream-box",
          children: [
            Widget.Icon().bind("icon", Audio[stream], "icon-name", (icon) =>
              iconSubstitute(icon, stream),
            ),
            Widget.Label({ hpack: "start", hexpand: true }).bind(
              "label",
              Audio[stream],
              "description",
              (des) => des.split(" ").slice(0, 5).join(" "),
            ),
            Widget.Icon({ hpack: "end", icon: Settings.icons.panIcons.down }),
          ],
        }),
        onPrimaryClick: () => {
          streamListRevealer.revealChild = !streamListRevealer.revealChild;
          if (streamListRevealer.revealChild) {
            header.child.children[2].icon = Settings.icons.panIcons.up;
            return
          }
          header.child.children[2].icon = Settings.icons.panIcons.down
        },
      });

      box.children = [header, streamListRevealer];
    },
  });

const VolumeSlider = (stream, txt = "") =>
  Widget.Box({
    children: [
      Widget.Icon().hook(Audio, (self) => {
        if (txt) {
          self.icon =
            stream.isMuted || stream.stream.isMuted
              ? Settings.icons[txt + "Icons"].muted
              : Settings.icons[txt + "Icons"].normal;
          return;
        }
        if (stream.name === "WEBRTC VoiceEngine") {
          self.icon = "discord";
          return;
        }
        if (stream.name === "ZOOM VoiceEngine") {
          self.icon = "zoom-desktop";
          return;
        }
        self.icon = stream.name.toLowerCase().split(" ").join("-");
      }),

      Widget.Slider({
        drawValue: false,
        value: stream.bind("volume").as((vol) => vol * 100),
        max: 100,
        hexpand: true,
        onChange: ({ value }) => (stream.volume = value / 100),
      }),
    ],
  });

const VolumeMixer = (stream) =>
  Widget.Box({
    vertical: true,
    children: [
      VolumeSlider(Audio[stream], stream),
      Widget.Box({
        vertical: true,
        children: Audio.bind(stream === "speaker" ? "apps" : "recorders").as(
          (apps) =>
            apps.map((app) => {
              if (app.name === "PulseAudio Volume Control") return;
              return VolumeSlider(app);
            }),
        ),
      }),
    ],
  });

const Stream = (stream) =>
  Widget.Box({
    vertical: true,
    children: [StreamSelector(stream), VolumeMixer(stream)],
  });

const AudioSettingsBox = () =>
  Widget.Box({
    vertical: true,
    className: "audio-settings-box",
    setup: (box) => {
      const settings = Widget.Stack({
        transition: "slide_left_right",
        transitionDuration: Settings.animationTime,
        children: {
          input: Stream("microphone"),
          output: Stream("speaker"),
        },
        setup: (self) => {
          self.hook(audioSettings, () => {
            self.shown = audioSettings.current_page;
          });
        },
      });
      const header = Widget.Box({
        className: "audio-page-header",
        children: [
          Widget.Button({
            className: audioSettings.bind("current_page").as((currPage) => {
              return currPage === "input"
                ? "active-audio-page-header"
                : "";
            }),
            label: "Microphone",
            hpack: "center",
            hexpand: true,
            onPrimaryClick: () => audioSettings.toggle("input"),
          }),

          Widget.Button({
            className: audioSettings.bind("current_page").as((currPage) => {
              print(currPage);
              return currPage === "output"
                ? "active-audio-page-header"
                : "";
            }),
            label: "Speaker",
            hpack: "center",
            hexpand: true,
            onPrimaryClick: () => audioSettings.toggle("output"),
          }),
        ],
      });

      box.children = [header, settings];
    },
  });

export default () =>
  Widget.Window({
    name: "audio-settings",
    className: "audio-settings-window",
    anchor: ["top", "right"],
    popup: true,
    child: Popups("audio-settings", AudioSettingsBox(), "slide_down"),
  });
