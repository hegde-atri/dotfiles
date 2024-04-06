import GLib from "gi://GLib";
import Settings from "../../settings.js";

export default (notification, popup = false, visible = false) => {
  const NotifBox = Widget.EventBox({
    setup: (self) => {
      const notifBox = Widget.Box({
        className: "notif-box",
        vertical: true,
        setup: (self) => {
          self.toggleClassName("notif-popup-box", popup);
          self.toggleClassName(
            "urgent-notif",
            notification.urgency === "critical",
          );
          self.toggleClassName(
            "normal-notif",
            notification.urgency === "normal",
          );
          self.toggleClassName("low-notif", notification.urgency === "low");
        },
      });
      self.child = notifBox;

      self.onPrimaryClick = () => notification.dismiss();

      const info = Widget.Box({ className: "notif-info-box" });

      const textinfo = Widget.Box({ vertical: true });
      const details = Widget.Box({ vpack: "center" });

      if (notification.image) {
        print('showing image: ', notification.image)
        info.add(
          Widget.Box({
            className: 'notif-image',
            vpack: 'start',
            css: `
            background-image: url("${notification.image}");
            background-size: cover;
            background-repeat: no-repeat;
            min-width: 60px;
            min-height: 60px;
          `,
          }),
        );
      } else if (Utils.lookUpIcon(notification.appEntry || '')) {
        info.add(Widget.Icon({
          className: 'notif-image',
          vpack: 'start',
          icon: Utils.lookUpIcon(notification.appEntry),
          size: 60,
        }))
      } else if (Utils.lookUpIcon(notification.appIcon)) {
        info.add(Widget.Icon({
          className: 'notif-image',
          vpack: 'start',
          icon: notification.appIcon,
          size: 60
        }))
      } else {
        info.add(Widget.Icon({
          className: 'notif-image',
          vpack: 'start',
          icon: "dialog-information-symbolic",
          size: 60
        }))
      }

      details.add(
        Widget.Label({
          className: "notif-title",
          label: notification.summary,
          hpack: "start",
          max_width_chars: 20,
          wrap: true,
          truncate: "end",
          justification: "left",
          use_markup: true,
          hexpand: true,
        }),
      );

      details.add(
        Widget.Label({
          className: "notif-time",
          label: GLib.DateTime.new_from_unix_local(notification.time).format(
            "%I:%M %p",
          ),
        }),
      );

      details.add(
        Widget.Button({
          vpack: "start",
          className: "notif-close-button",
          child: Widget.Icon("window-close-symbolic"),
          onClicked: () => notification.close(),
        }),
      );


      textinfo.add(details);
      let notifBody;
      if (notification.body) {
        notifBody = Widget.Revealer({
          transition: 'slide_down',
          transitionDuration: Settings.animationTime / 4,
          revealChild: true,
          child: Widget.Label({
              className: "notif-body",
              label: notification.body
                // HACK: remove linebreaks, so lines property works properly
                .replace(/(\r\n|\n|\r)/gm, " "),
              hpack: "start",
              use_markup: true,
              justification: "left",
              max_width_chars: 24,
              lines: 3,
              truncate: "end",
              wrap: true,
          })})
        textinfo.add(notifBody)
      }

      info.add(textinfo);
      notifBox.add(info);

      let buttonsRevealer;

      if (notification.actions?.length) {

      const buttons = Widget.Box({
        children: notification.actions.map((action) =>
          Widget.Button({
            className: "notif-action-button",
            label: action.label,
            hpack: "fill",
            hexpand: true,
            onClicked: () => notification.invoke(action.id),
          }),
        ),
      });

      buttonsRevealer = Widget.Revealer({
        transition: "slide_down",
        transition_duration: Settings.animationTime / 4,
        child: buttons,
      });

      notifBox.add(buttonsRevealer);
      }

      self.onHover = () => {
        if (buttonsRevealer) buttonsRevealer.revealChild = true;
        if (notifBody) {
          notifBody.child.lines = -1
          notifBody.child.truncate = 'none'
        };
      };
      self.onHoverLost = () => {
        if (buttonsRevealer) buttonsRevealer.revealChild = false;
        if (notifBody) {
          notifBody.child.lines = 3
          notifBody.child.truncate = 'end'
        };
      };
    },
  });

  // Step 2: fir ye aega
  const leftSlideRevealer = Widget.Revealer({
    transition: "slide_left",
    transitionDuration: Settings.animationTime / 2,
    revealChild: visible,
    child: NotifBox,
    setup: (self) => {
      Utils.timeout(Settings.animationTime / 4 + 1, () => {
        self.revealChild = true;
      });
    },
  });

  // Step 1: Jaga banaega
  const downSlideRevealer = Widget.Revealer({
    transition: "slide_down",
    transitionDuration: Settings.animationTime / 4,
    child: leftSlideRevealer,
    setup: (self) => {
      Utils.timeout(1, () => {
        self.revealChild = true;
      });
    },
  });

  return Widget.Box({
    hpack: "end",
    vpack: "center",
    children: [downSlideRevealer],
    setup: (self) => {
      self.attribute = {
        destroy: () => {
          leftSlideRevealer.revealChild = false;
          Utils.timeout(Settings.animationTime/2, () => {
            downSlideRevealer.revealChild = false;
            Utils.timeout(Settings.animationTime / 4, () => {
              self.destroy();
            });
          });
        },
      };
    },
  });
};
