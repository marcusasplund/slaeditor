/* global btoa, localStorage */
import { h, text, app } from 'hyperapp'
import './styles/app.scss'

const storageKey = 'editor'

const saveToLocalStorage = (state) => localStorage.setItem(storageKey, JSON.stringify(state))

const getFromLocalStorage = () => JSON.parse(localStorage.getItem(storageKey))

const exampleCSS = `
html {
  line-height: 1;
}
body {
  align-items: center;
  background-color: #111;
  display: flex;
  font-family: Helvetica Neue, sans-serif;
  height: 100vh;
  justify-content: center;
  margin: 0;
  padding: 0;
  text-align: center;
}
h1 {
  color: #00caff;
  font-weight: 100;
  font-size: 8em;
  margin: 0;
  padding-bottom: 15px;
}
button {
  background: #111;
  border-radius: 0;
  border: 1px solid #00caff;
  color: #00caff;
  font-size: 2em;
  font-weight: 100;
  margin: 0;
  outline: none;
  padding: 5px 15px;
  transition: background .2s;
}
button:hover, button:active, button:disabled {
  background: #00caff;
  color: #111;
}
button:active {
  outline: 2px solid #00caff;
}
button:focus {
  border: 1px solid #00caff;
}
button + button {
  margin-left: 3px;
}
`

const exampleHTML = '<div id="app"></div>'

const exampleJS = `
import { h, text, app } from "https://unpkg.com/hyperapp"

app({
  init: 0,
  view: state =>
    h("div", {}, [
      h("h1", {}, text(state)),
      h("button", { onclick: state => state - 1 }, text('-')),
      h("button", { onclick: state => state + 1 }, text('+'))
    ]),
  node: document.getElementById("app")
})`

const code = (style, html, js) => `
<html>
  <head>
    <style>
    ${style}
    </style>
    </head>
    <body>
    ${html}
      <script type="module">
      ${js}
      </script>
  </body>
</html>`

const initialState = getFromLocalStorage() || {
  parsed: btoa(code(exampleCSS, exampleHTML, exampleJS)),
  html: exampleHTML,
  css: exampleCSS,
  js: exampleJS,
  checked: 'js'
}

const SetHTML = (state, event) => {
  const newHTML = event.target.value
  const newCode = code(state.css, newHTML, state.js)
  const newState = {
    ...state,
    html: newHTML,
    checked: 'html',
    parsed: btoa(newCode)
  }
  saveToLocalStorage(newState)
  return newState
}

const SetCSS = (state, event) => {
  const newCSS = event.target.value
  const newCode = code(newCSS, state.html, state.js)
  const newState = {
    ...state,
    css: newCSS,
    checked: 'css',
    parsed: btoa(newCode)
  }
  saveToLocalStorage(newState)
  return newState
}

const SetJS = (state, event) => {
  const newJS = event.target.value
  const newCode = code(state.css, state.html, newJS)
  const newState = {
    ...state,
    js: newJS,
    checked: 'js',
    parsed: btoa(newCode)
  }
  saveToLocalStorage(newState)
  return newState
}

const SetChecked = (state, event) => {
  const newState = {
    ...state,
    checked: event.target.id
  }
  saveToLocalStorage(newState)
  return newState
}

const HTMLArea = (state) =>
  h('textarea', {
    oninput: SetHTML,
    placeholder: 'Put your HTML here'
  }, text(state.html))

const CSSArea = (state) =>
  h('textarea', {
    oninput: SetCSS,
    placeholder: 'Put your CSS here'
  }, text(state.css))

const JSArea = (state) =>
  h('textarea', {
    oninput: SetJS,
    placeholder: 'Put your JS here'
  }, text(state.js))

const Result = (state) =>
  h('section', {}, [
    h('iframe', {
      src: `data:text/html;base64, ${state.parsed}`
    })
  ])

app({
  init: initialState,
  view: state =>
    h('div', {
      id: 'editor'
    }, [
      h('div', {
        id: 'left-panel',
        class: 'tabs'
      }, [
        h('div', {
          class: 'tab'
        }, [
          h('input', {
            type: 'radio',
            id: 'html',
            name: 'tab-group-1',
            onclick: SetChecked,
            checked: state.checked === 'html'
          }),
          h('label', {
            for: 'html'
          }, text('html')),
          h('div', {
            class: 'content'
          }, HTMLArea(state))
        ]),
        h('div', {
          class: 'tab'
        }, [
          h('input', {
            type: 'radio',
            id: 'css',
            name: 'tab-group-1',
            onclick: SetChecked,
            checked: state.checked === 'css'
          }),
          h('label', {
            for: 'css'
          }, text('css')),
          h('div', {
            class: 'content'
          }, [
            CSSArea(state)
          ])
        ]),
        h('div', {
          class: 'tab'
        }, [
          h('input', {
            type: 'radio',
            id: 'js',
            onclick: SetChecked,
            name: 'tab-group-1',
            checked: state.checked === 'js'
          }),
          h('label', {
            for: 'js'
          }, text('javascript')),
          h('div', {
            class: 'content'
          }, [
            JSArea(state)
          ])
        ])
      ]),
      h('div', {
        id: 'right-panel'
      }, [
        Result(state)
      ])
    ]),
  node: document.getElementById('app')
})
