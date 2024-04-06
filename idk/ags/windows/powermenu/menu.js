import Widget from "resource:///com/github/Aylur/ags/widget.js";
import App from "resource:///com/github/Aylur/ags/app.js";

import PopupMenu from "../popups.js";
import Settings from "../../settings.js";

function clickCallback(action) {
  App.closeWindow("powermenu");
  const confirmWindow = App.getWindow("confirm-window");
  confirmWindow.attribute.assertiveCommand.setValue(
    Settings.powerOptions[action],
  );
  App.openWindow("confirm-window");
}

const PowerMenu = () =>
  Widget.Box({
    className: "powermenu-widget",
    vertical: true,
    spacing: 8,
    children: [
      Widget.Button({
        className: "lock-button",
        child: Widget.Icon(Settings.icons.powerIcons.lock),
        onClicked: () => clickCallback("lock"),
      }),
      Widget.Button({
        className: "logout-button",
        child: Widget.Icon(Settings.icons.powerIcons.logout),
        onClicked: () => clickCallback("logout"),
      }),
      Widget.Button({
        className: "suspend-button",
        child: Widget.Icon(Settings.icons.powerIcons.suspend),
        onClicked: () => clickCallback("suspend"),
      }),
      Widget.Button({
        className: "restart-button",
        child: Widget.Icon(Settings.icons.powerIcons.restart),
        onClicked: () => clickCallback("restart"),
      }),
      Widget.Button({
        className: "poweroff-button"sh
        ,
        child: Widget.Icon(Settings.icons.powerIcons.poweroff),
        onClicked: () => clickCallback("poweroff"),
      }),
    ],
  });

export default () =>
  Widget.Window({
    name: "powermenu",
    className: "powermenu-window",
    popup: true,
    visible: false,
    layer: "overlay",
    keymode: "exclusive",
    anchor: ["right"],

    child: PopupMenu("powermenu", PowerMenu(), "slide_left"),

    // To make the window stick to right side of the screen
    setup: (self) => {
      self.child.css = `padding:2px;padding-right:0px`;
    },
  });
