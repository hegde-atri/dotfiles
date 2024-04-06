import WorkspaceWidget from "./workspace.js";
import PlayerWidget from "./player.js";
import ClockWidget from "./clock.js";
import BatteryWidget from "./battery.js";
import SysTrayWidget from "./systray.js";
import InfoWidget from "./info.js";
import { ControlButton, PowerButton } from "./buttons.js";

const LeftWidgetContainer = () =>
  Widget.Box({
    className: "left-widget-container",
    hpack: "center",
    vpack: "center",
    children: [WorkspaceWidget(), PlayerWidget()],
  });

const CenterWidgetContainer = () =>
  Widget.Box({
    className: "center-widget-container",
    hpack: "center",
    vpack: "center",
    children: [ClockWidget()],
  });

const RighWidgetContainer = () =>
  Widget.Box({
    className: "right-widget-container",
    hpack: "center",
    vpack: "center",

    children: [SysTrayWidget(), InfoWidget(), BatteryWidget(), PowerButton()],
  });

// Bar declaration
const Bar = () =>
  Widget.CenterBox({
    className: "bar-box",

    // Left Widgets
    start_widget: Widget.Box({
      hpack: "start",
      children: [LeftWidgetContainer()],
    }),

    // Center Widgets
    center_widget: Widget.Box({
      hpack: "center",
      children: [CenterWidgetContainer()],
    }),

    // Right Widgets
    end_widget: Widget.Box({
      hpack: "end",
      children: [RighWidgetContainer()],
    }),
  });

// Returning the bar window
export default (monitor) =>
  Widget.Window({
    name: `bar${monitor}`, // Name of the window
    anchor: ["top", "left", "right"], // Anchor for positioning
    exclusivity: "exclusive", // To give separate space to the window
    monitor: monitor,
    className: "bar-window",
    child: Bar(),
    layer: "top",
  });
