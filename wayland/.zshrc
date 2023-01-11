# -- Author: Atri Hegde --
# -- My .zshrc config --

# -- PATH --
PATH=$PATH:$(yarn global bin):/home/mizuuu/.local/bin:/home/mizuuu/.cargo/bin:/home/mizuuu/.emacs.d/bin:/home/mizuuu/.local/share/gem/ruby/3.0.0/bin

# -- ZSH history --
HISTSIZE=10000
SAVEHIST=$HISTSIZE
HISTFILE=~/.zsh_history

# -- ZSH problems --
bindkey  "^[[H"   beginning-of-line
bindkey  "^[[F"   end-of-line
bindkey  "^[[3~"  delete-char
bindkey "^[[1;5C" forward-word
bindkey "^[[1;5D" backward-word

# -- Defaults --
export EDITOR='nvim'

# -- Aliases --
alias logseq='logseq --enable-features=UseOzonePlatform --ozone-platform=wayland'
alias l='exa --icons -l'
alias ls='exa --icons'
alias ll='exa --icons -l'
alias la='exa --icons -a'
alias lla='exa --icons -la'
alias lt='exa --icons -T'
alias lta='exa --icons -Ta'
alias update='paru'
alias install='paru -S'
alias uninstall='paru -R'
alias vim='emacsclient -nc'
alias neovide='WINIT_UNIX_BACKEND=x11 neovide'
alias startnetwork='sudo virsh net-start default'
alias pico='picom -b --experimental-backends'
alias pi='ssh mizuuu@10.27.27.103'
alias gs='git status'
alias ga='git add .'
alias gaa='git add -A .'
alias gc='git commit -m'
# alias gc=~/.local/bin/commit.sh
alias gp='git push'
alias git-add-origin='git remote set-url --add origin'

alias vpn='nmcli connection up client'
alias clip='xclip -selection clipboard'
alias presentmd='npx @marp-team/marp-cli@^2 --bespoke.transition --preview'
alias present-compilePDF='marp --pdf --allow-local-files'
alias ytmp3="yt-dlp -f 'ba' -x --audio-format mp3 -o '%(title)s.%(ext)s'"
alias hpAdapter='pactl set-default-sink alsa_output.usb-0c76_USB_PnP_Audio_Device-00.analog-stereo'

alias bsh='nvim ~/.bashrc'
alias zshrc='nvim ~/.zshrc'
alias bsp='nvim ~/.config/bspwm/bspwmrc'
alias sx='nvim ~/.config/bspwm/sxhkdrc'
alias hypr='nvim ~/.config/hypr/hyprland.conf'
# alias cd='echo "Nick is coolest"'

# -- Utility --
alias hst="history 1 -1 | cut -c 8- | sort | uniq | fzf | tr -d '\n' | wl-copy"

# -- Starship prompt --
eval "$(starship init zsh)"

# --  Syntax highlighting --
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh

# -- sdkman --
# export SDKMAN_DIR="$HOME/.sdkman"
# [[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"

# -- rvm --
# eval "$(rbenv init -)"

# -- nvm --
# -- disabled by default since it is too slow --
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


# -- fetch --
rxfetch
