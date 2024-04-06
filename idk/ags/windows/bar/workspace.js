import Settings from "../../settings.js";

const Hyprland = await Service.import("hyprland");

// Each workspace button
const WorkspaceButton = (i) =>
  Widget.Button({
    setup: (self) => {
      self.hook(
        Hyprland,
        () => {
          // Checks if the workspace as clients
          const workspace = Hyprland.getWorkspace(i);
          self.toggleClassName("active-workspace", Boolean(workspace?.windows));
        },
        "changed",
      );
    },

    // Add focused class if workspace is focused
    className: Hyprland.active.workspace
      .bind("id")
      .transform((id) => `${id === i ? "focused-workspace" : ""}`),

    // shape inside the workspace button
    child: Widget.Box({
      className: "workspace-fill",
      hpack: "center",
      vpack: "center",
    }),

    onPrimaryClick: () =>
      Hyprland.message(`dispatch workspace ${i}`).catch(print),
  });

export default () =>
  Widget.Box({
    className: "workspace-widget",
    hpack: "center",
    vpack: "center",

    // Make workspaces according to `workspaceCount`
    children: Array.from(
      { length: Settings.workspaceCount },
      (_, i) => i + 1,
    ).map((i) => WorkspaceButton(i)),
  });
