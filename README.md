# slaeditor


[![GitHub issues](https://img.shields.io/github/issues/marcusasplund/slaeditor.svg)](https://github.com/marcusasplund/slaeditor/issues)

## [Demo](https://pap.as/slaeditor/)

Read more about the concept at Medium [here](https://medium.com/@marcusasplund/single-line-application-bc3b9d3c9269)

A single line application 'editor'

Offline support with service worker

## Installation

```sh
git clone https://github.com/marcusasplund/slaeditor.git
cd slaeditor
npm install
npm run dev
```

Vite prints the local URL when the development server starts.

The project records version-specific install-script approvals for `esbuild` and
`fsevents` in `package.json`. Review pending scripts with:

```sh
npm install-scripts ls
```

After reviewing a package, approve it with:

```sh
npm install-scripts approve <pkg>
```

## Build

```sh
npm run build
```

This generates the production assets in `dist/`.
