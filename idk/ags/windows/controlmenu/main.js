import Settings from "../../settings.js";

const { query } = await Service.import("applications");

const AppMenu = () => {
    const applications = query("").map((app) => {
        return Widget.Button({
            className: 'app-item-box',
            child: Widget.Box({
                spacing: 10,
                children: [Widget.Icon(app.icon_name || ""), Widget.Label(app.name)],
            }),
            attribute: { app },
            onClicked: () => {
                App.closeWindow("controlmenu");
                app.launch();
            },
        });
    });

    const list = Widget.Box({
        vertical: true,
        children: applications,
    });

    return Widget.Box({
        className: "appmenu-box",
        vertical: true,
        children: [
            Widget.Entry({
                hexpand: true,
                on_accept: () => {
                    if (applications[0]) {
                        App.toggleWindow("controlmenu");
                        list.children[0].attribute.app.launch();
                    }
                },

                // filter out the list
                on_change: ({ text }) =>
                    applications.forEach((item) => {
                        item.visible = item.attribute.app.match(text ?? "");
                    }),
            }),
            Widget.Scrollable({
                hscroll: "never",
                hexpand: true,
                child: list,
                css: "min-height: 300px;",
            }),
        ],
    });
};

const ControlStack = () =>
    Widget.Stack({
        children: {
            appmenu: AppMenu(),
        },
    });

const SelectorRibbon = () =>
    Widget.CenterBox({
        className: "selector-ribbon",
        startWidget: Widget.Button({
            hpack: "start",
            label: "Apps",
        }),
        endWidget: Widget.Box({
            hpack: "end",
            children: [
                Widget.Button({
                    child: Widget.Icon(Settings.icons.notificationIcons.dndoff),
                }),
            ],
        }),
    });

const ControlMenu = () =>
    Widget.Box({
        className: "controlmenu-box",
        vertical: true,
        children: [SelectorRibbon(), ControlStack()],
    });

export default () =>
    Widget.Window({
        name: "controlmenu",
        className: "controlmenu-window",
        anchor: ["top", "left"],
        child: ControlMenu(),
        popup: true,

        // visible: false,
        keymode: "exclusive",
    });
