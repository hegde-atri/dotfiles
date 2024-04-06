const cacheDir = Utils.exec('sh -c "echo $XDG_CACHE_HOME"');

export default {
  workspaceCount: 10,
  animationTime: 500,
  popupTimeout: 7000,

  idleStateFile: `${cacheDir}/idlestate`,

  swayIdleCmd: 'sh -c "swayidle -C ~/.config/swayidle"',
  dateCmd: ["date", "+%a, %d %b - %H:%M"],
  hyprpickerCmd: 'sh -c "hyprpicker -a"',
  screenshotCmd: `sh -c 'grim \
                      -g "$(slurp)" \
                      $(xdg-user-dir PICTURES)/screenshots/$(date +"%s_grim.png")'`,

  powerOptions: {
    poweroff: 'sh -c "systemctl poweroff"',
    restart: 'sh -c "systemctl reboot"',
    suspend: 'sh -c "systemctl suspend"',
    logout: 'sh -c "hyprctl dispatch exit"',
    lock: 'sh -c "swaylock -c 000000"',
  },

  icons: {
    brightnessIcon: "display-brightness-high-symbolic",
    hyprpickerIcon: "color-select-symbolic",
    panIcons: {
        left: "pan-start-symbolic",
        right: "pan-end-symbolic",
        down: "pan-down-symbolic",
        up: "pan-up-symbolic",
    },
    controlIcon: `${App.configDir}/assets/archlinux-icon-crystal-128.svg`,
    screenshotIcon: "screenshooter-symbolic",

    speakerIcons: {
      normal: "audio-volume-high-symbolic",
      muted: "audio-volume-muted-symbolic",
    },

    microphoneIcons: {
      normal: "audio-input-microphone-high-symbolic",
      muted: "audio-input-microphone-muted-symbolic",
    },

    idlehintIcons: {
      off: "my-caffeine-off-symbolic",
      on: "my-caffeine-on-symbolic",
    },

    batteryIcons: {
      charging: "freon-voltage-symbolic",
      normal: "battery-level-100-symbolic",
    },

    playerIcons: {
      pause: "media-playback-pause-symbolic",
      play: "media-playback-start-symbolic",
      prev: "media-skip-backward-symbolic",
      next: "media-skip-forward-symbolic",
    },

    notificationIcons: {
      dndon: "notification-disabled-symbolic",
      dndoff: "notification-symbolic",
    },

    powerIcons: {
      poweroff: "system-shutdown-symbolic",
      restart: "view-refresh-symbolic",
      suspend: "system-log-out-symbolic",
      logout: "application-exit-symbolic",
      lock: "system-lock-screen-symbolic",
    },
  },
};
