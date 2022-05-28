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



alias ll='exa --icons -l'
alias la='exa --icons -la'

alias clip='xclip -selection clipboard'

alias update='paru'
alias yay='paru'
# alias cat='bat'
alias install='sudo pacman -S'
alias pi='ssh mizuuu@192.168.1.3'

alias gs='git status'
alias ga='git add -A .'
alias gc='git commit -m'
alias gp='git push'
alias push='git push'

alias bsh='vim ~/.bashrc'
alias dot='cd ~/.dotfiles'
alias sx='vim ~/.config/bspwm/sxhkd/sxhkdrc'
alias bsp='vim ~/.config/bspwm/bspwmrc'
alias poly='vim ~/.config/polybar/config.ini'

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion