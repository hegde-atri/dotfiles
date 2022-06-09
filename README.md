# dotfiles

These are my dotiles, used on Arch Linux as of now. It is part of my arch install plan, check it out [here](https://github.com/hegde-atri/arch-install).

## Usage

I manage my dotfiles using [stow](https://www.gnu.org/software/stow/). You may find that some configs rely on other ones. I will try to list the dependencies below. To try out a config, first make a backup of existing config / config folder using something like `mv config config.backup`. Now clone the repo using the following command 
```sh
git clone --depth-=1 https://gitlab.com/linux_things/dotfiles.git ~/.dotfiles
```
*if not you may need to change stow's target and home dir*

For background blur to work, make sure you run picom with the experimental backends flag(like in the bspwmrc file).

## Dependencies

- The bspwm/sxhkd config relies on rofi config, and also custom scripts.
- custom scripts relies on pywal, pywalfox and also zathura-pywal.
- ranger config requires ueberzug.
- super + d, dictionary needs the didyoumean package intalled, either built from source or installed from the AUR.

## Credits

- If I have derived any custom scripts from already existing ones, credits mentioned in the file.
- Rofi config is a modifed + themed version of rofi themes by adi1090x on [github](https://github.com/adi1090x/rofi).
- mpv config is from Tsuba's config on [github](https://github.com/Tsubajashi/mpv-settings).
- Firefox config is using [firefox-csshacks](https://github.com/MrOtherGuy/firefox-csshacks.git) by MrOtherGuy on github.

## Repository

This repository is on both [github](https://github.com/hegde-atri/.dotfiles) and also gitlab [gitlab](https://gitlab.com/linux_things). You will also find my wallpapers in gitlab.
