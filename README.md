# dotfiles

These are my dotiles, used on Arch Linux as of now. It is part of my arch install plan, check it out [here](https://github.com/hegde-atri/arch-install).

## Usage

I manage my dotfiles using [stow](https://www.gnu.org/software/stow/). You may find that some configs rely on other ones. I will try to list the dependencies below. To try out a config, first make a backup of existing config / config folder using something like `mv config config.backup`. Now clone the repo using the following command 
```sh
git clone --depth-=1 https://gitlab.com/linux_things/dotfiles.git ~/.dotfiles
```
*if not you may need to change stow's target and home dir*

## Dependencies

- The bspwm/sxhkd config relies on rofi config

## Credits

- Rofi config is a modifed + themed version of rofi themes by adi1090x on [github](https://github.com/adi1090x/rofi).
- mpv config is from Tsuba's config on [github](https://github.com/Tsubajashi/mpv-settings).
- Firefox config is using [firefox-csshacks](https://github.com/MrOtherGuy/firefox-csshacks.git) by MrOtherGuy on github.
