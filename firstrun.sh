#!/bin/bash

dir=`pwd`
fonts_dir="$HOME/.local/share/fonts"

echo -e "\n[1] Installing fonts..."
if [[ -d "$fonts_dir" ]]; then
  cp -rf $dir/depends/fonts/* "$fonts_dir"
else
  mkdir -p "$fonts_dir"
  cp -rf $dir/depends/fonts/* "$fonts_dir"
fi

echo -e "\n[2] Installing any dependencies..."
sudo pacman --no-confirm -S stow grep

echo -e "\nAll done !"