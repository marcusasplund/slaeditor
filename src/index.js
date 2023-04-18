/* global btoa */
/** @jsx h */
import { h, app, text } from 'hyperapp'
import { targetValue } from '@hyperapp/events'
import './styles/app.scss'

const example = `<html>
  <head>
    <style>
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
      border-radius: 0px;
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
    </style>
    </head>
    <body>
      <div id="app"></div>
      <script type="module">
        import { h, app, text } from "https://unpkg.com/hyperapp"

        app({
          init: 0,
          view: state =>
            h("div", {}, [
              h("h1", {}, text(state)),
              h("button", { onclick: state => state - 1 }, text("-")),
              h("button", { onclick: state => state + 1 }, text("+"))
            ]),
          node: document.getElementById("app")
        })
      </script>
  </body>
</html>`

const initialState = {
  parsed: '',
  code: '',
  copied: false,
  example: example,
  placeholder: 'Paste your awesome website/app code here'
}

const ParseString = (state, value) => ({
  ...state,
  copied: false,
  parsed: btoa(value)
})

const CopyExampleCode = state => ({
  ...state,
  copied: true,
  code: example,
  parsed: btoa(example)
})

const TextArea = state => (
  h('textarea', {
    id: 'codearea',
    oninput: [ParseString, targetValue],
    placeholder: state.placeholder
  }, text(state.code)
  )
)

const Result = state => (
  h('section', {}, [
    h('p', {}, text('Below is your app as a base64-encoded link that you can copy and paste in your browsers adress bar')),
    h('pre', {}, h('code', {}, text(`data:text/html;base64, ${state.parsed}`))),
    h('hr', {})
  ])
)

const Test = state => (
  h('section', {}, [
    h('p', {}, text('To try it out; copy the example code below, paste in the left pane, then copy the base64 result produced above and paste in a browser address bar')),
    h('br', {}),
    h('button', { onclick: CopyExampleCode }, text('copy example to editorarea')),
    h('pre', {}, h('code', {}, text(state.example)))
  ])
)

app({
  init: initialState,
  view: state => (
    h('div', {
      id: 'editor'
    }, [
      TextArea(state),
      h('div', {}, [
        state.parsed ? Result(state) : '',
        state.copied ? '' : Test(state),
        h('p', {}, text('You can look at the code ')),
        h('a', { href: 'https://github.com/marcusasplund/slaeditor' }, text('here'))
      ]),
    ])),
  node: document.getElementById('app')
})
