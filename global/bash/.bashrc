#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return


alias ls='exa --icons'
PS1='[\u@\h \W]\$ '

PATH=$PATH:/home/mizuuu/.local/bin
. "$HOME/.cargo/env"

eval "$(starship init bash)"

# export envar with alpha set.
export color0_alpha="#22${color0/'#'}"

alias ll='exa --icons -l'
alias la='exa --icons -la'

alias clip='xclip -selection clipboard'

alias update='paru'
alias yay='paru'
alias vim='nvim'
alias vv='nvim'
# alias cat='bat'
alias install='sudo pacman -S'
alias pi='ssh mizuuu@192.168.1.3'
alias mic='pactl set-source-volume alsa_input.usb-0c76_USB_PnP_Audio_Device-00.mono-fallback 55000'
# alias setbg='wal -o ~/.config/dunst/reload_pywal_dunst.sh -i' superseded by custom script
# alias update-site='scp -r -i /mnt/hdd/Atri/ssh-keys/hegdeatri-dot-com /home/mizuuu/repos/hegdeatri-dot-com/public/* mizuuu@hegdeatri.com:/var/www/mywebsite/'
alias update-site='rsync -a ~/Public/mywebsite mizuuu@hegdeatri.com:/var/www/ --delete'
alias update-public='cp -r ~/repos/hegdeatri-dot-com/public/* ~/Public/mywebsite/'

alias yt-song="yt-dlp -f 'ba' -x --audio-format mp3 -o '%(title)s.%(ext)s'"
alias yt-audio="yt-dlp -f 'ba' -x --audio-format mp3"

alias gs='git status'
alias ga='git add -A .'
alias gc='git commit -m'
alias gp='git push'
alias push='git push'

alias bsh='vim ~/.bashrc'
alias dots='cd ~/.dotfiles'
alias sx='vim ~/.config/bspwm/sxhkd/sxhkdrc'
alias bsp='vim ~/.config/bspwm/bspwmrc'
alias poly='vim ~/.config/polybar/config.ini'

alias bonsai='cbonsai --life 40 --live --multiplier 5 --time 0.1 --infinite'

colorscript random
