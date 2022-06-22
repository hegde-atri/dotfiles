#!/bin/bash

dots_repo=$HOME/.source/dotfiles
dots=$HOME/.dotfiles
dir=`pwd`
configs=`ls -d */ | grep -wv depends`

save_new_config(){
  print_configs
  echo "Enter name of config"
  echo -n ">> "
  read new_config
  mkdir $dots_repo/$new_config
  cp -r $dots/* $dots_repo/$new_config/
  echo "------------------------------------"
  echo " New config $new_config saved!"
  echo "------------------------------------"
  configs=`ls -d $dots_repo | grep -wv depends`
}

save_config(){
  print_configs
  echo "Enter config to replace"
  echo -n ">> "
  read selected_config
  echo "----------------------------------"
  echo "|    !! Ctrl-C to cancel !!      |"
  echo "----------------------------------"
  sleep 3
  echo "[*] Deleting existing dir..."
  rm -rf $dots_repo/$selected_config
  mkdir $dots_repo/$selected_config
  cp -r $dots/* $dots_repo/$selected_config
  echo "------------------------------------"
  echo " config $selected_config replaced! "
  echo "------------------------------------"  
  }

load_config(){
  print_configs
  echo "Enter config to load"
  echo -n ">> "
  read selected_config
  echo "----------------------------------"
  echo "|    !! Ctrl-C to cancel !!      |"
  echo "----------------------------------"
  sleep 3
  echo "[*] Deleting existing dots..."
  rm -rf $dots/*
  echo "[*] Copying new dots..."
  cp -r $dots_repo/$selected_config/* $dots/
  echo "[*] Stowing new configs"
  cd $dots
  stow *
  echo "[*] Config - $selected_config loaded!"
}

load_global_config(){
  echo "Deleting the ~/.dots_global folder in 3 seconds!"
  echo "----------------------------------"
  echo "|    !! Ctrl-C to cancel !!      |"
  echo "----------------------------------"
  sleep 3
  echo "[*] Deleting ~/.dots_global/"
  rm -rf $HOME/.dots_global
  echo "[*] Creating new ~/.dots_global/"
  mkdir $HOME/.dots_global
  echo "[*] Copying global dots to ~/.dots_global/"
  mv $dots_repos/global $HOME/.dots_global
  echo "[*] Done !"

}

print_configs(){
  echo "-----------------------------------"
  echo "Current configs:"
  echo "${configs[*]}"
  echo "-----------------------------------"
}

main(){
  print_configs
  echo "----------------------------------------------------------"
  echo "| [a] save current config as new                         |"
  echo "| [b] save current config to                             |"
  echo "|   (!! replaces everything in target config!!)          |"
  echo "| [c] switch to config                                   |"
  echo "| [d] load global config                                 |"
  echo "----------------------------------------------------------"
  echo -n ">> "
  read choice

  if [ "$choice" == "a" ] ; then
    save_new_config
  elif [ "$choice" == "b" ] ; then
    save_config
  elif [ "$choice" == "c" ] ; then
    load_config
  else
    load_global_config
  fi
}

main