import Notification from "./notification.js";
import Popups from "../popups.js";
import settings from "../../settings.js";

const Notifications = await Service.import("notifications");
Notifications.cacheActions = true;
const NotificationRegion = () => {
  return Widget.Box({
    className: "notif-panel-region",
    vertical: true,
    hpack: "center",
    hexpand: true,
    setup: (self) => {
      const notifList = new Object();

      const onNotified = (_, id) => {
        const notif = Notifications.getNotification(id);

        if (!notif) return;

        const notification = Notification(notif, false, true);

        print(notif.id, "inside");
        const replace = notifList[id];
        if (replace) {
          replace.destroy();
        }
        self.children = [notification, ...self.children];
        notifList[id] = notification;
      };

      const onClosed = (_, id) => {
        if (!notifList[id]) return;

        notifList[id].attribute.destroy();
        delete notifList[id];
      };

      Utils.timeout(300, () => {
        Notifications.notifications.forEach((notif) =>
          onNotified(self, notif.id),
        );
      });

      self.hook(Notifications, onNotified, "notified");
      self.hook(Notifications, onClosed, "closed");
    },
  });
};

const NotificationBox = () =>
  Widget.Box({
    className: "notif-panel-box",
    vertical: true,
    children: [
      Widget.Box({
        className: "notif-panel-header",
        children: [
          Widget.Label({
            hexpand: true,
            hpack: "start",
            label: "Notifications",
          }),
          Widget.Button({
            hpack: "end",
            label: "Clear",
            onClicked: () => Notifications.clear(),
          }),
        ],
      }),
      Widget.Stack({
        children: {
          overlay: Widget.Box({
            vertical: true,
            hpack: "center",
            vpack: "center",
            hexpand: true,
            spacing: 10,
            children: [
              Widget.Icon({
                size: 50,
                icon: settings.icons.notificationIcons.dndoff,
              }),
              Widget.Label({
                css: "font-size: 16px;",
                label: "No Notifications",
              }),
            ],
          }),
          notifications: Widget.Scrollable({

            hscroll: "never",
            vscroll: "automatic",
            hpack: "center",
            css: "min-height: 500px",
            child: NotificationRegion(),
          }),
        },
        setup: (self) =>
          self.hook(Notifications, () => {
            self.shown = Notifications.notifications.length
              ? "notifications"
              : "overlay";
          }),
      }),
    ],
  });

const NotificationPanel = () =>
  Widget.Box({
    children: [NotificationBox()],
  });

export default () =>
  Widget.Window({
    name: "notification-panel",
    className: "notif-panel-window",
    anchor: ["top", "left"],
    child: Popups("notification-panel", NotificationPanel(), "slide_right"),
    visible: false,
    keymode: "on-demand",
    popup: true,
  });
