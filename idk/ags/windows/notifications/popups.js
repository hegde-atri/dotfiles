import Notification from "./notification.js";
import Settings from "../../settings.js";

const Notifications = await Service.import("notifications");

Notifications.popupTimeout = Settings.popupTimeout;

const Popups = () =>
  Widget.Box({
    className: "notif-popups-box",
    css: "padding: 1px 0px 1px 2px;",
    vertical: true,
    spacing: 0,

    setup: (self) => {
      const popupList = new Object();

      const onNotify = (_, id) => {
        const notif = Notifications.getNotification(id);

        // If notification is not found or dnd is on.. return
        if (!notif || Notifications.dnd) return;

        const replace = popupList[id];
        if (replace) {
          replace.destroy();
        }

        // convert the notification
        const popup = Notification(notif, true);

        // add the notification to the popupList and to the box
        self.children = [popup, ...self.children];
        popupList[id] = popup;
      };

      const onDismiss = (_, id) => {
        // If notification is not in popup list exit
        if (!popupList[id]) return;

        // If notification is there then renmove it from the list and close the notification
        popupList[id].attribute.destroy();
        delete popupList[id];
      };

      self.hook(Notifications, onNotify, "notified");
      self.hook(Notifications, onDismiss, "dismissed");
      self.hook(Notifications, onDismiss, "closed");
    },
  });

export default () =>
  Widget.Window({
    name: "notification-popups",
    className: "notif-popup-window",
    layer: "overlay",
    anchor: ["top", "right"],
    child: Popups(),
  });
