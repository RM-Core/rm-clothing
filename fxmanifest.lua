fx_version 'cerulean'
game 'rdr3'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

description 'RMClothing'

name 'rm_clothing'
version '0.0.1'
license 'MIT'
author 'Cr1MsOn'

lua54 'yes'

dependencies {
    '/onesync',
}

shared_scripts {
    '@rm_core/import.lua',
    '@ox_lib/init.lua',
    'shared/*.lua',
}

client_scripts {
    'client/main.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
}

ui_page 'web/build/index.html'

files {
    'web/build/index.html',
    'web/build/**/*',
}
