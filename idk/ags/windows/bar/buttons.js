import SwayIdleState from "../../services/inhibitor.js";
import Settings from "../../settings.js";

export const ControlButton = () =>
    Widget.Button({
        className: "control-button",
        hpack: "center",
        vpack: "center",
        cursor: "pointer",
        child: Widget.Icon({
            icon: Settings.icons.controlIcon,
        }),
    });

export const PowerButton = () =>
    Widget.Button({
        className: "power-button",
        hpack: "center",
        vpack: "center",
        cursor: "pointer",
        child: Widget.Icon({ icon: Settings.icons.powerIcons.poweroff }),
        onPrimaryClickRelease: () => App.openWindow("powermenu"),
    });
