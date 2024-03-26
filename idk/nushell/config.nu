# Nushell Config File

# For more information on defining custom themes, see
# https://www.nushell.sh/book/coloring_and_theming.html
# And here is the theme collection
# https://github.com/nushell/nu_scripts/tree/main/themes
let dark_theme = {
  separator: "#a9b7c6"
    leading_trailing_space_bg: { attr: "n" }
    header: { fg: "#6a8759" attr: "b" }
    empty: "#9876aa"
    bool: {|| if $in { "#629755" } else { "light_gray" } }
    int: "#a9b7c6"
    filesize: {|e|
      if $e == 0b {
        "#a9b7c6"
      } else if $e < 1mb {
        "#629755"
      } else {{ fg: "#9876aa" }}
    }
    duration: "#a9b7c6"
    date: {|| (date now) - $in |
      if $in < 1hr {
        { fg: "#4eade5" attr: "b" }
      } else if $in < 6hr {
        "#4eade5"
      } else if $in < 1day {
        "#bbb529"
      } else if $in < 3day {
        "#6a8759"
      } else if $in < 1wk {
        { fg: "#6a8759" attr: "b" }
      } else if $in < 6wk {
        "#629755"
      } else if $in < 52wk {
        "#9876aa"
      } else { "dark_gray" }
    }
    range: "#a9b7c6"
    float: "#a9b7c6"
    string: "#a9b7c6"
    nothing: "#a9b7c6"
    binary: "#a9b7c6"
    cellpath: "#a9b7c6"
    row_index: { fg: "#6a8759" attr: "b" }
    record: "#a9b7c6"
    list: "#a9b7c6"
    block: "#a9b7c6"
    hints: "dark_gray"

    shape_and: { fg: "#cc7832" attr: "b" }
    shape_binary: { fg: "#cc7832" attr: "b" }
    shape_block: { fg: "#9876aa" attr: "b" }
    shape_bool: "#629755"
    shape_custom: "#6a8759"
    shape_datetime: { fg: "#629755" attr: "b" }
    shape_directory: "#629755"
    shape_external: "#629755"
    shape_externalarg: { fg: "#6a8759" attr: "b" }
    shape_filepath: "#629755"
    shape_flag: { fg: "#9876aa" attr: "b" }
    shape_float: { fg: "#cc7832" attr: "b" }
    shape_garbage: { fg: "#FFFFFF" bg: "#FF0000" attr: "b" }
    shape_globpattern: { fg: "#629755" attr: "b" }
    shape_int: { fg: "#cc7832" attr: "b" }
    shape_internalcall: { fg: "#629755" attr: "b" }
    shape_list: { fg: "#629755" attr: "b" }
    shape_literal: "#9876aa"
    shape_match_pattern: "#6a8759"
    shape_matching_brackets: { attr: "u" }
    shape_nothing: "#629755"
    shape_operator: "#bbb529"
    shape_or: { fg: "#cc7832" attr: "b" }
    shape_pipe: { fg: "#cc7832" attr: "b" }
    shape_range: { fg: "#bbb529" attr: "b" }
    shape_record: { fg: "#629755" attr: "b" }
    shape_redirection: { fg: "#cc7832" attr: "b" }
    shape_signature: { fg: "#6a8759" attr: "b" }
    shape_string: "#6a8759"
    shape_string_interpolation: { fg: "#629755" attr: "b" }
    shape_table: { fg: "#9876aa" attr: "b" }
    shape_variable: "#cc7832"

    background: "#2b2b2b"
    foreground: "#a9b7c6"
    cursor: "#a9b7c6"
}

# Completion using carapace
$env.PATH = ($env.PATH | prepend "/home/mizuuu/.config/carapace/bin")

let carapace_completer = {|spans|
  carapace $spans.0 nushell $spans | from json
}

# The default config record. This is where much of your global configuration is setup.
$env.config = {
  ls: {
    use_ls_colors: true # use the LS_COLORS environment variable to colorize output
    clickable_links: true # enable or disable clickable links. Your terminal has to support links.
  }
  rm: {
    always_trash: true # always act as if -t was given. Can be overridden with -p
  }
  table: {
    mode: rounded # basic, compact, compact_double, light, thin, with_love, rounded, reinforced, heavy, none, other
    index_mode: always # "always" show indexes, "never" show indexes, "auto" = show indexes when a table has "index" column
    trim: {
      methodology: wrapping # wrapping or truncating
      wrapping_try_keep_words: true # A strategy used by the 'wrapping' methodology
      truncating_suffix: "..." # A suffix used by the 'truncating' methodology
    }
  }

  explore: {
    help_banner: true
    exit_esc: true

    command_bar_text: '#C4C9C6'
    # command_bar: {fg: '#C4C9C6' bg: '#223311' }

    status_bar_background: {fg: '#1D1F21' bg: '#C4C9C6' }
    # status_bar_text: {fg: '#C4C9C6' bg: '#223311' }

    highlight: {bg: 'yellow' fg: 'black' }

    status: {
      # warn: {bg: 'yellow', fg: 'blue'}
      # error: {bg: 'yellow', fg: 'blue'}
      # info: {bg: 'yellow', fg: 'blue'}
    }

    try: {
      # border_color: 'red'
      # highlighted_color: 'blue'

      # reactive: false
    }

    table: {
      split_line: '#404040'

      cursor: true

      line_index: true
      line_shift: true
      line_head_top: true
      line_head_bottom: true

      show_head: true
      show_index: true

      # selected_cell: {fg: 'white', bg: '#777777'}
      # selected_row: {fg: 'yellow', bg: '#C1C2A3'}
      # selected_column: blue

      # padding_column_right: 2
      # padding_column_left: 2

      # padding_index_left: 2
      # padding_index_right: 1
    }

    config: {
      cursor_color: {bg: 'yellow' fg: 'black' }

      # border_color: white
      # list_color: green
    }
  }

  history: {
    max_size: 10000 # Session has to be reloaded for this to take effect
    sync_on_enter: true # Enable to share history between multiple sessions, else you have to close the session to write history to file
    file_format: "plaintext" # "sqlite" or "plaintext"
  }
  completions: {
    case_sensitive: false # set to true to enable case-sensitive completions
    quick: true  # set this to false to prevent auto-selecting completions when only one remains
    partial: true  # set this to false to prevent partial filling of the prompt
    algorithm: "fuzzy"  # prefix or fuzzy
    external: {
      enable: true # set to false to prevent nushell looking into $env.PATH to find more suggestions, `false` recommended for WSL users as this look up my be very slow
      max_results: 100 # setting it lower can improve completion performance at the cost of omitting some options
      completer: $carapace_completer # check 'carapace_completer' above as an example
    }
  }
  filesize: {
    metric: true # true => KB, MB, GB (ISO standard), false => KiB, MiB, GiB (Windows standard)
    format: "auto" # b, kb, kib, mb, mib, gb, gib, tb, tib, pb, pib, eb, eib, zb, zib, auto
  }
  cursor_shape: {
    emacs: line # block, underscore, line (line is the default)
    vi_insert: line # block, underscore, line (block is the default)
    vi_normal: block # block, underscore, line  (underscore is the default)
  }
  color_config: $dark_theme   # if you want a light theme, replace `$dark_theme` to `$light_theme`
  use_grid_icons: true
  footer_mode: "25" # always, never, number_of_rows, auto
  float_precision: 2 # the precision for displaying floats in tables
  # buffer_editor: "emacs" # command that will be used to edit the current line buffer with ctrl+o, if unset fallback to $env.EDITOR and $env.VISUAL
  use_ansi_coloring: true
  edit_mode: emacs # emacs, vi
  shell_integration: true # enables terminal markers and a workaround to arrow keys stop working issue
  # true or false to enable or disable the welcome banner at startup
  show_banner: false
  render_right_prompt_on_last_line: false # true or false to enable or disable right prompt to be rendered on last line of the prompt.

  hooks: {
    pre_prompt: [{||
      null  # replace with source code to run before the prompt is shown
    }]
    pre_execution: [{||
      null  # replace with source code to run before the repl input is run
    }]
    env_change: {
      PWD: [{|before, after|
            if ('FNM_DIR' in $env) and ([.nvmrc .node-version] | path exists | any { |it| $it }) {
                fnm use
            }
        }]
    }
    display_output: {||
      if (term size).columns >= 100 { table -e } else { table }
    }
    command_not_found: {||
      null  # replace with source code to return an error message when a command is not found
    }
  }
  menus: [
      # Configuration for default nushell menus
      # Note the lack of source parameter
      {
        name: completion_menu
        only_buffer_difference: false
        marker: "| "
        type: {
            layout: columnar
            columns: 4
            col_width: 20   # Optional value. If missing all the screen width is used to calculate column width
            col_padding: 2
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
      }
      {
        name: history_menu
        only_buffer_difference: true
        marker: "? "
        type: {
            layout: list
            page_size: 10
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
      }
      {
        name: help_menu
        only_buffer_difference: true
        marker: "? "
        type: {
            layout: description
            columns: 4
            col_width: 20   # Optional value. If missing all the screen width is used to calculate column width
            col_padding: 2
            selection_rows: 4
            description_rows: 10
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
      }
      # Example of extra menus created using a nushell source
      # Use the source field to create a list of records that populates
      # the menu
      {
        name: commands_menu
        only_buffer_difference: false
        marker: "# "
        type: {
            layout: columnar
            columns: 4
            col_width: 20
            col_padding: 2
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
        source: { |buffer, position|
            $nu.scope.commands
            | where name =~ $buffer
            | each { |it| {value: $it.name description: $it.usage} }
        }
      }
      {
        name: vars_menu
        only_buffer_difference: true
        marker: "# "
        type: {
            layout: list
            page_size: 10
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
        source: { |buffer, position|
            $nu.scope.vars
            | where name =~ $buffer
            | sort-by name
            | each { |it| {value: $it.name description: $it.type} }
        }
      }
      {
        name: commands_with_description
        only_buffer_difference: true
        marker: "# "
        type: {
            layout: description
            columns: 4
            col_width: 20
            col_padding: 2
            selection_rows: 4
            description_rows: 10
        }
        style: {
            text: green
            selected_text: green_reverse
            description_text: yellow
        }
        source: { |buffer, position|
            $nu.scope.commands
            | where name =~ $buffer
            | each { |it| {value: $it.name description: $it.usage} }
        }
      }
  ]
  keybindings: [
    {
      name: completion_menu
      modifier: none
      keycode: tab
      mode: [emacs vi_normal vi_insert]
      event: {
        until: [
          { send: menu name: completion_menu }
          { send: menunext }
        ]
      }
    }
    {
      name: completion_previous
      modifier: shift
      keycode: backtab
      mode: [emacs, vi_normal, vi_insert] # Note: You can add the same keybinding to all modes by using a list
      event: { send: menuprevious }
    }
    {
      name: history_menu
      modifier: control
      keycode: char_r
      mode: emacs
      event: { send: menu name: history_menu }
    }
    {
      name: next_page
      modifier: control
      keycode: char_x
      mode: emacs
      event: { send: menupagenext }
    }
    {
      name: undo_or_previous_page
      modifier: control
      keycode: char_z
      mode: emacs
      event: {
        until: [
          { send: menupageprevious }
          { edit: undo }
        ]
       }
    }
    {
      name: yank
      modifier: control
      keycode: char_y
      mode: emacs
      event: {
        until: [
          {edit: pastecutbufferafter}
        ]
      }
    }
    {
      name: unix-line-discard
      modifier: control
      keycode: char_u
      mode: [emacs, vi_normal, vi_insert]
      event: {
        until: [
          {edit: cutfromlinestart}
        ]
      }
    }
    {
      name: kill-line
      modifier: control
      keycode: char_k
      mode: [emacs, vi_normal, vi_insert]
      event: {
        until: [
          {edit: cuttolineend}
        ]
      }
    }
    # Keybindings used to trigger the user defined menus
    {
      name: commands_menu
      modifier: control
      keycode: char_t
      mode: [emacs, vi_normal, vi_insert]
      event: { send: menu name: commands_menu }
    }
    {
      name: vars_menu
      modifier: alt
      keycode: char_o
      mode: [emacs, vi_normal, vi_insert]
      event: { send: menu name: vars_menu }
    }
    {
      name: commands_with_description
      modifier: control
      keycode: char_s
      mode: [emacs, vi_normal, vi_insert]
      event: { send: menu name: commands_with_description }
    }
  ]
}

$env.ASDF_DIR = '/opt/asdf-vm/'
source /opt/asdf-vm/asdf.nu

# Starship prompt
source ~/.cache/starship/init.nu

# Zoxide
source ~/.zoxide.nu

# PNPM
# $env.PNPM_HOME = $"($env.HOME)/Library/pnpm"
# $env.PATH = ($env.PATH | append $env.PNPM_HOME)

source ~/.config/nushell/scripts/paste_image.nu
source ~/.config/nushell/scripts/secrets.nu

alias l = exa --icons -l
alias ls = exa --icons
alias ll = exa --icons -l
alias la = exa --icons -a
alias lla = exa --icons -la
alias lt = exa --icons -T
alias lta = exa --icons -Ta
alias pi = ssh pi
alias akuma = ssh akuma
alias lf = yazi
alias jt = joshuto
# -- Git Alias --
alias gs = git status
alias ga = git add .
alias gaa = git add -A .
alias gc = git commit -m
alias gb = git branch
alias gsb = git checkout -b
alias grc = git rebase --continue
alias gp = git push
alias git-add-origin = git remote set-url --add origin
# -- Action Alias --
# start docker
alias startdocker = sudo systemctl start docker.service
# alias startdocker = sudo rc-service docker start
# start cups
alias startcups = sudo systemctl start cups.service
# alias startcups = sudo rc-service cupsd start
# start bluetooth
alias bluetooth = sudo systemctl start bluetooth.service
# alias bluetooth = sudo rc-service bluetoothd start
# enable home vpn
alias vpn = nmcli connection up thinkpad
# wl-copy
alias clip = wl-copy
# marp cli present
alias presentmd = marp --preview
# marp cli convert to pdf.
alias present-compilePDF = marp --pdf --allow-local-files
# Download yt video as mp3
alias ytmp3 = yt-dlp -f 'ba' -x --audio-format mp3 -o '%(artist)s - %(title)s.%(ext)s' --embed-thumbnail --parse-metadata 'title:%(artist)s - %(title)s'
# Download yt video into mp3 files based on chapters
alias ytmp3-chapters = yt-dlp -f 'ba' -x --audio-format mp3 -o '%(title)s.%(ext)s' --embed-thumbnail --parse-metadata 'title:%(artist)s - %(title)s' --split-chapters  -o 'chapter:%(title)s/[%(section_number)s] - %(section_title)s.%(ext)s'
# Download yt video
alias ytmp4 = yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' -o '%(title)s.%(ext)s'
# Download yt into different videos based on chapters
alias ytmp4-chapters = yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' -o '%(title)s.%(ext)s' --split-chapters  -o 'chapter:%(title)s/[%(section_number)s] - %(section_title)s.%(ext)s'
# alias hpAdapter = pactl set-default-sink alsa_output.usb-0c76_USB_PnP_Audio_Device-00.analog-stereo
# Start virt-man's default network
alias startnetwork = sudo virsh net-start default
# -- File Alias --
# alias bsh = nvim ~/.bashrc
# alias zshrc = nvim ~/.zshrc
# alias clearzsh = rm -rf .zsh_history
# alias hypr = vim ~/.config/hypr/hyprland.conf
# alias cd='echo "Nick is coolest"'
# kitty's kitten
alias icat = kitty +kitten icat
# open logseq
alias logseq = logseq --enable-features=UseOzonePlatform --ozone-platform=wayland
# run obsidian natively in wayland
alias obsidian = obsidian -enable-features=UseOzonePlatform -ozone-platform=wayland
# emacs -nc
# alias nvim = emacsclient -nc
# emacs -nw
alias vim = emacsclient -nw
# emacs -nw
alias vv = emacsclient -nw
# neovide :(
# alias neovide = WINIT_UNIX_BACKEND=x11 neovide
# zoxide
alias cd = z
# cp but using rsync to show progress
alias cp = rsync -ah --progress
# open ncmpcpp
alias pp = ncmpcpp
# open zathura
alias zz = zathura
# run repoman
alias repo = repoman

# -- Utility --
# alias hst = (history 1 -1 | cut -c 8- | sort | uniq | fzf | tr -d '\n' | wl-copy)
alias syncTime = do {
    sudo ntpd -qg
    sudo hwclock --systohc
}

alias setupADB = do {
    adb usb
    adb tcpip 5555
    adb connect 10.27.27.106:5555
}

alias sendMusic = rsync -avP ~/Music pi:~/
alias getMusic = rsync -avP pi:~/Music ~
alias qr = qrencode -t utf8

rxfetch
