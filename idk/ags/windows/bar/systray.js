import Settings from "../../settings.js";

const SystemTray = await Service.import("systemtray");

const SysTrayWidget = () =>
  Widget.Revealer({
    transition: "slide_right",
    transitionDuration: Settings.animationTime,
    revealChild: false,
    child: Widget.Box({
      className: "systray-icons",
      children: SystemTray.bind("items").transform((items) => {
        return items.map((item) => {
          return Widget.Button({
            child: Widget.Icon().bind("icon", item, "icon"),
            cursor: "pointer",
            hpack: "center",
            vpack: "center",
            tooltipMarkup: item.bind("tooltip-markup"),
            onPrimaryClick: (_, event) => item.activate(event),
            onSecondaryClick: (_, event) => item.openMenu(event),
          });
        });
      }),
    }),
  });

const getIcon = (reveal) =>
  reveal
    ? Settings.icons.panIcons.right
    : Settings.icons.panIcons.left;

export default () =>
  Widget.EventBox({
            hpack: "center",
            vpack: "center",
    setup: (self) => {
      self.systray = SysTrayWidget();
      self.holder = Widget.Button({
        className: "systray-button",
        child: Widget.Icon(getIcon(self.systray.revealChild)),
        cursor: "pointer",
      });
      self.child.add(self.holder);
      self.child.add(self.systray);
      self.holder.onPrimaryClick = () => {
        self.systray.revealChild = !self.systray.revealChild;
        self.holder.child.icon = getIcon(self.systray.revealChild);
      };
    },
    child: Widget.Box({
      className: "systray-widget",
    }),
  });
