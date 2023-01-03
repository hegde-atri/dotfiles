call plug#begin()
    " Appearance
    Plug 'vim-airline/vim-airline'
    Plug 'ryanoasis/vim-devicons'
    Plug 'folke/tokyonight.nvim', { 'branch': 'main' }
    Plug 'vim-airline/vim-airline-themes'

    " Utilities
    Plug 'sheerun/vim-polyglot'
    Plug 'jiangmiao/auto-pairs'
    Plug 'ap/vim-css-color'
    Plug 'preservim/nerdtree'

    " Completion / linters / formatters
    " Plug 'neoclide/coc.nvim',  {'branch': 'master', 'do': 'yarn install'}
    Plug 'plasticboy/vim-markdown'

    " Git
    Plug 'airblade/vim-gitgutter'
call plug#end() 

" Options
" set background=dark
set clipboard=unnamedplus
set completeopt=noinsert,menuone,noselect
set cursorline
set hidden
set inccommand=split
set mouse=a
set number
set relativenumber
set splitbelow splitright
set title
set ttimeoutlen=0
set wildmenu
set ignorecase
set smartcase



" Tabs size
set expandtab
set shiftwidth=2
set tabstop=2

filetype plugin indent on
syntax on

" Italics
let &t_ZH="\e[3m"
let &t_ZR="\e[23m"

" Colours
colorscheme tokyonight
let g:airline_theme='base16_dracula'
let g:airline_powerline_fonts = 1
let g:airline#extensions#tabline#enabled = 1
let g:tokyonight_style = "night"
let g:tokyonight_italic_functions = 1
let g:tokyonight_sidebars = [ "qf", "vista_kind", "terminal", "packer" ]

" Nerdtree
let NERDTreeShowHidden=1
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>

" Tabs
nnoremap <C-h> :tabprev<CR>
nnoremap <C-l> :tabnext<CR>

" CTRLP
" let g:ctrlp_user_command = ['.git/', 'git --git-dir=%s/.git ls-files -oc --exclude-standard']

" For markdown
" Disable math tex conceal feature
let g:tex_conceal = ''
let g:vim_markdown_math = 1

" Markdown
let g:vim_markdown_folding_disabled = 1
let g:vim_markdown_frontmatter = 1
let g:vim_markdown_conceal = 0
let g:vim_markdown_fenced_languages = ['tsx=typescriptreact']
