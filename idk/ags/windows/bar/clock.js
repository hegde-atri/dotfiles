import Settings from "../../settings.js";

export default () =>
  Widget.Label({
    className: "clock-widget",
    setup: (self) =>
      self.poll(1000, (self) =>
        Utils.execAsync(Settings.dateCmd)
          .then((date) => (self.label = date))
          .catch((e) => print(e)),
      ),
  });
