require("mason").setup()
require("mason-lspconfig").setup({
  ensure_installed = { 
    "sumneko_lua",
--    "rust_analyzer",
  }
})

require("lspconfig").sumneko_lua.setup() {}
--require("lspconfig").rust_analyzer.setup() {}
