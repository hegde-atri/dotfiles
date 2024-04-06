import Popups from "../popups.js";

const Bluetooth = await Service.import("bluetooth");

const Device = (dev) =>
  Widget.Box({
    children: [
      Widget.Icon(dev.icon_name + "-symbolic"),
      Widget.Label({ hpack: "start", hexpand: true, label: dev.name }),
      dev.connecting
        ? Widget.Spinner({ active: true })
        : Widget.Switch({ active: dev.connected }).on(
          "notify::active",
          ({ active }) => {
            if (active !== dev.connected) dev.setConnection(active);
          },
        ),
    ],
  });

const Header = () =>
  Widget.Box({
    children: [
      Widget.Label({ hexpand: true, hpack: "start", label: "Bluetooth" }),
      Widget.Switch({ hpack: "end" })
        .hook(Bluetooth, (sw) => {
          if (sw.active !== Bluetooth.enabled) sw.active = Bluetooth.enabled;
        })
        .on("notify::active", ({ active }) => {
          if (active !== Bluetooth.enabled) Bluetooth.enabled = active;
        }),
    ],
  });

const BluetoothBox = () =>
  Widget.Box({
    vertical: true,
    children: [
      Header(),
      Widget.Box({
        vertical: true,
        setup: (self) =>
          self.hook(Bluetooth, () => {
            print(Bluetooth.devices);
            self.children = Bluetooth.devices.map((dev) => Device(dev));
          }),
      }),
    ],
  });

export default () =>
  Widget.Window({
    name: "bluetooth",
    className: "bluetooth-window",
    anchor: ["bottom", "left"],
    popup: true,
    child: Popups("bluetooth", BluetoothBox(), "slide_up"),
  });
