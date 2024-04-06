import Settings from "../../settings.js";

const Mpris = await Service.import("mpris");

const accentColorCache = {};

const labelParser = (player) => {
  const trackArtists = player?.trackArtists?.join(", ");
  return `${trackArtists?.concat(trackArtists ? " - " : "")}${player?.trackTitle}`;
};

  const getAccentColor = async (image) => {
    const command = `convert ${image} -colors 2 -quantize RGB -unique-colors txt:- | awk '{ print $3 }' | tail -n 1`;
    return await Utils.execAsync(`sh -c "${command}"`)
      .then((res) => (res.length > 7 ? res.slice(0, 7) : res))
      .then((res) => res.trim())
      .catch(print);
  };

const getPlayer = () => {
  return Mpris.getPlayer("spotify") || Mpris.getPlayer();
};

const PlayerProgress = () =>
  Widget.CircularProgress({
    startAt: 0.75, // Start from top
    rounded: true,
    setup: (self) => {
      // Changes the progress
      self.poll(1000, (self) => {
        self.value = getPlayer()?.position / getPlayer()?.length;
      });
      self.hook(Mpris, async () => {
        const player = getPlayer();
        let accentColor;
        if (accentColorCache[player?.coverPath]) {
          accentColor = accentColorCache[player?.coverPath];
        } else {
          accentColor = await getAccentColor(player?.coverPath).catch(print);
          accentColorCache[player?.coverPath] = accentColor;
        }
        Object.keys(accentColorCache).forEach((path) => {
          if (path !== player?.coverPath) {
            delete accentColorCache[path];
          }
        });
        if (accentColor != "") {
          self.css = `color: ${accentColor};`;
        }
      });
    },
    child: Widget.Icon().hook(Mpris, (self) => {
      self.icon = `${
        getPlayer()?.playBackStatus === "Playing"
          ? Settings.icons.playerIcons.pause
          : Settings.icons.playerIcons.play
      }`;
    }),
  });

const PlayerWidget = () =>
  Widget.EventBox({
    cursor: "pointer",
    child: Widget.Box({
      className: "player-widget",
      spacing: 10,
      children: [
        PlayerProgress(),
        Widget.Label({
          truncate: "end",
          max_width_chars: 40,
        }).hook(Mpris, (self) => {
          self.label = labelParser(getPlayer());
        }),
      ],
    }),
    onPrimaryClick: () => getPlayer().playPause(),
  });

export default () =>
  Widget.Revealer({
    child: PlayerWidget(),
    revealChild: Mpris.bind("players").as((p) => p.length),
    transition: "slide_right",
    transitionDuration: Settings.animationTime,
  });
