#!/bin/bash

sleep 2

ydotool click 0xC0

for (( i=1; i<=100; i++))
do 
  ydotool mousemove -x -50 -y 130
  ydotool click 0xC0
  echo "moved"
  ydotool mousemove -x 50 -y -130
  ydotool click 0xC0
  echo "moved"
done
