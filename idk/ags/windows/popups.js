import Settings from '../settings.js'

export default (windowName, child, transition) =>
  Widget.Box({
    css: "padding:1px;",
    children: [
      Widget.Revealer({
        setup: (self) => {
          self.hook(App, (_, wname, visible) => {
            if (wname === windowName) {
              self.revealChild = visible;
            }
          });
        },
        transition,
        child,
        transitionDuration: Settings.animationTime / 2,
      }),
    ],
  });

