#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
PS1='[\u@\h \W]\$ '

PATH=$PATH:/home/mizuuu/.local/bin:/home/mizuuu/.cargo/bin:/home/mizuuu/.emacs.d/bin:/home/mizuuu/.local/share/gem/ruby/3.0.0/bin

alias ls='exa --icons'
alias ll='exa --icons -l'
alias la='exa --icons -a'
alias lla='exa --icons -la'

alias vpn='nmcli connection up client'
alias clip='xclip -selection clipboard'
alias presentmd='npx @marp-team/marp-cli@^2 --bespoke.transition --preview'
alias present-compilePDF='marp --pdf --allow-local-files'

alias hpAdapter='pactl set-default-sink alsa_output.usb-0c76_USB_PnP_Audio_Device-00.analog-stereo'

alias update='paru'
alias install='paru -S'
alias uninstall='paru -R'

alias vim='emacsclient -nc'
alias startnetwork='doas virsh net-start default'

alias pico='picom -b --experimental-backends'
alias pi='ssh mizuuu@10.27.27.103'
alias gs='git status'
alias ga='git add .'
alias gaa='git add -A .'
alias gc='git commit -m'
alias gp='git push'
alias git-add-origin='git remote set-url --add origin'

alias bsh='nvim ~/.bashrc'
alias bsp='nvim ~/.config/bspwm/bspwmrc'
alias sx='nvim ~/.config/bspwm/sxhkdrc'
alias hypr='nvim ~/.config/hypr/hyprland.conf'
#alias cd='echo "Nick is coolest"'

#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

eval "$(starship init bash)"

#tmux new -A -s main

#session_name="main"

# 1. First you check if a tmux session exists with a given name.
#tmux has-session -t=$session_name 2> /dev/null
#
## 2. Create the session if it doesn't exists.
#if [[ $? -ne 0 ]]; then
#  TMUX='' tmux new-session -d -s "$session_name"
#fi
#
## 3. Attach if outside of tmux, switch if you're in tmux.
#if [[ -z "$TMUX" ]]; then
#  tmux attach -t "$session_name"
#else
#  tmux switch-client -t "$session_name"
#fi

pfetch
