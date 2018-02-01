# slaeditor

[![GitHub issues](https://img.shields.io/github/issues/marcusasplund/slaeditor.svg)](https://github.com/marcusasplund/slaeditor/issues)
[![Build status](https://travis-ci.org/marcusasplund/slaeditor.svg?branch=master)](https://travis-ci.org/marcusasplund/slaeditor)
[![dependencies](https://david-dm.org/marcusasplund/slaeditor.svg)](https://david-dm.org/marcusasplund/slaeditor)

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## [Demo](https://pap.as/slaeditor/)

Read more about it at Medium [here](https://medium.com/@marcusasplund/single-line-application-bc3b9d3c9269)

A single line application 'editor'

Offline support with service worker

Made with [Hyperapp](https://github.com/hyperapp/hyperapp) and [Parcel bundler](https://github.com/parcel-bundler/parcel)

TODO: [a bug in parcel](https://github.com/parcel-bundler/parcel/issues/235) rewrites the manifest.json to a js file so the pwa requirements fails.

## installation

````bash
    $ git clone https://github.com/marcusasplund/slaeditor.git

    $ cd slaeditor

    $ yarn

    $ yarn start
````

This will open application at http://localhost:3000/ in browser

## build a release

````bash
    $ yarn build

````
This will generate a release directory with your minified/rev'd assets.
