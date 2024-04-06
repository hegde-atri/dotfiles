import Brightness from "../../services/brightness.js";
import Settings from "../../settings.js";

const Audio = await Service.import("audio");

const BrightnessWidget = () =>
  Widget.Box({
    className: "brightness-widget",
    children: [
      Widget.CircularProgress({
        startAt: 0.75,
        value: Brightness.bind("brightness"),
        child: Widget.Icon(Settings.icons.brightnessIcon),
        hpack: "center",
        vpack: "center",
        rounded: true,
      }),
    ],
  });

const VolumeWidget = (stream) =>
  Widget.Box({
    className: `${stream}-widget`,
    children: [
      Widget.Stack({
        setup: (self) =>
          self.hook(
            Audio,
            () => {
              self.shown =
                Audio[stream]?.stream?.isMuted || Audio[stream]?.isMuted
                  ? "muted"
                  : "progress";
            },
            "changed",
          ),
        children: {
          progress: Widget.CircularProgress({
            className: "volume-progress",
            startAt: 0.75,
            rounded: true,
            hpack: "center",
            vpack: "center",
            value: Audio[stream]?.bind("volume"),
            child: Widget.Icon(
              stream === "speaker"
                ? Settings.icons.speakerIcons.normal
                : Settings.icons.microphoneIcons.normal,
            ),
          }),

          muted: Widget.Icon(
            stream === "speaker"
              ? Settings.icons.speakerIcons.muted
              : Settings.icons.microphoneIcons.muted,
          ),
        },
      }),
    ],
  });

export default () =>
  Widget.Box({
    className: "info-widget",
    spacing: 15,
    children: [
      VolumeWidget("microphone"),
      VolumeWidget("speaker"),
      BrightnessWidget(),
    ],
  });
