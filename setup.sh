#!/bin/bash

save_new_config(){
  echo ""
}

save_config(){
  echo ""
}

load_config(){
  echo ""
}

main(){
  dir=`pwd`
  configs=`ls -d */ | grep -wv depends`

  echo "-----------------------------------"
  echo "Current configs:"
  echo "${configs[*]}"
  echo "-----------------------------------"

  echo "----------------------------------------------------------"
  echo "| [a] save current config as new                         |"
  echo "| [s] save current config to                             |"
  echo "| Or enter config name you wish to switch too            |"
  echo "----------------------------------------------------------"
  echo -n ">> "
  read choice

  if [ "$choice" == "a" ] ; then
    save_new_config
  elif [ "$choice" == "s" ] ; then
    save_config
  else
    chosen_config="$choice"
    load_config
  fi
}

main