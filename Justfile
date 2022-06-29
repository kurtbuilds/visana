set dotenv-load := true
export PATH := "./node_modules/.bin:" + env_var('PATH')

help:
    @just --list

bootstrap:
    pnpm install 

build:
    mkdir -p build
    esbuild src/main.ts --bundle --outfile=build/main.js

alias b := build

watch:
    watchexec -w src -- just build

release: build
    imcon icon.png -o icon16.png -w 16
    imcon icon.png -o icon48.png -w 48
    imcon icon.png -o icon128.png -w 128
    zip artifact.zip build/main.js icon*.png manifest.json

alias w := watch
