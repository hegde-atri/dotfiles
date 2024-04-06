const Battery = await Service.import('battery')

import Settings from "../../settings.js";

const BatteryProgress = () =>
  Widget.CircularProgress({
    className: "battery-progress",
    rounded: true,
    startAt: 0.75,
    hpack: 'center',
    vpack: 'center',


    value: Battery.bind("percent").transform((p) => (p > 0 ? p / 100 : 0)),

    child: Widget.Icon({
      icon: Battery.bind("charging").transform((state) =>
        state
          ? Settings.icons.batteryIcons.charging
          : Settings.icons.batteryIcons.normal,
      ),
    }),
  });

export default () =>
  Widget.Box({
    className: "battery-widget",
    spacing: 5,
    hpack: 'center',
    vpack: 'center',

    children: [
      Widget.Label({
        className: "battery-percent",
        label: Battery.bind("percent").transform((p) => `${p}%`),
      }),
      BatteryProgress(),
    ],
    setup: (self) => {
      self.hook(Battery, () => {
        self.toggleClassName("battery-charging", Battery.charging);
        self.toggleClassName("battery-red", Battery.percent <= 30);
        self.toggleClassName(
          "battery-yellow",
          Battery.percent <= 70 && Battery.percent > 30,
        );
        self.toggleClassName(
          "battery-green",
          Battery.percent <= 100 && Battery.percent > 70,
        );
      });
    },
  });
