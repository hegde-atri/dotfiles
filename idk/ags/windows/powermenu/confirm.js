import Widget from "resource:///com/github/Aylur/ags/widget.js";
import * as Utils from "resource:///com/github/Aylur/ags/utils.js";

import PopupMenu from "../popups.js";

const ConfirmBox = (assertiveCommand) =>
  Widget.Box({
    className: "confirm-box",
    vpack: "center",
    hpack: "center",
    vertical: true,
    setup: (self) => {
      self.children = [
        Widget.Label({ className: "confirm-text", label: `Are you sure?` }),
        Widget.Box({
          className: "confirm-button-container",
          vpack: "center",
          hexpand: true,
          children: [
            Widget.Button({
              label: "Yes",
              hexpand: true,
              onClicked: assertiveCommand.bind().transform((value) => {
                return async () => {
                  App.closeWindow("confirm-window");
                  await Utils.execAsync(value).catch(print);
                };
              }),
            }),
            Widget.Button({
              label: "No",
              hexpand: true,
              onClicked: () => {
                App.closeWindow("confirm-window");
              },
            }),
          ],
        }),
      ];
    },
  });

export default () => 
  Widget.Window({
    name: "confirm-window",
    className: "confirm-window",
    popup: true,
    visible: false,
    layer: "overlay",
    keymode: "exclusive",
    anchor: ["bottom"],
    attribute: { assertiveCommand: Variable("") }, // The command to be executed when pressed `Yes`
    setup: (self) => {
      self.hook(App, (_, wname, visible) => {
        if (wname !== "confirm-window") {
          if (visible) {
            App.closeWindow("confirm-window");
          }
        }
      });
      self.child = PopupMenu(
        "confirm-window",
        ConfirmBox(self.attribute.assertiveCommand),
        "slide_up",
      );
    },
  });

