#!/bin/nu
def paste_image [filename] {
  wl-paste | convert - $filename
}
