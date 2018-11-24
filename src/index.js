/* global btoa Event */
import { h, app } from 'hyperapp'
import { debounce } from 'debounce'
import './styles/app.scss'

/** @jsx h */
const state = {
  parsed: ``,
  code: '',
  example: `<html>
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
        <script src="https://unpkg.com/hyperapp@1.2.9/dist/hyperapp.js"></script>
        <script>
        const h = hyperapp.h
        const app = hyperapp.app
        const state = {
          count: 0
        }
        const actions = {
          down: value => state => ({ count: state.count - value }),
          up: value => state => ({ count: state.count + value })
        }
        const view = (state, actions) =>
          h("div", {}, [
            h("h1", {}, state.count),
            h("button", { onclick: () => actions.down(1) }, "-"),
            h("button", { onclick: () => actions.up(1) }, "+")
          ])
        app(state, actions, view, document.body)
      </script>
    </body>
  </html>`,
  placeholder: 'Paste your awesome website/app code here'
}

const actions = {
  set: x => x,
  parseString: str => state => ({
    parsed: btoa(str)
  }),
  copyExampleCode: () => (state, actions) => {
    actions.set({
      code: state.example
    })
    let event = new Event('input')
    document.getElementById('codearea').dispatchEvent(event)
  }
}

const TextArea = ({ state, parse }) => (
  <textarea
    id='codearea'
    oninput={debounce(parse, 200)}
    placeholder={state.placeholder}>
    {state.code}
  </textarea>
)

const view = (state, actions) => (
  <div id='editor'>
    <TextArea state={state} parse={e => actions.parseString(e.target.value)} />
    <div>
      <a href={`data:text/html;base64, ${state.parsed}`}>
        <p>
          This is a link you in some browsers can right click and open in a new tab*<br />
        </p>
      </a>
      <p>
        <small>*Due to browser restrictions it does not work to open such a link in the same window</small>
      </p>
      <hr />
      <p>
        Below is your app as a base64-encoded link that you can copy and paste in your browsers adress bar
      </p>
      <pre>
        <code>
        data:text/html;base64, {state.parsed}
        </code>
      </pre>
      <hr />
      <p>
        To try it out; copy the example code below, paste in the left pane, then copy the base64 result produced above and paste in a browser address bar
        <button disabled={state.parsed} onclick={e => actions.copyExampleCode()}>copy example to textarea</button>
      </p>
      <pre>
        <code>
          {state.example}
        </code>
      </pre>
    </div>
    <p>You can look at the code <a href='https://github.com/marcusasplund/slaeditor'>here</a></p>
  </div>
)

app(state, actions, view, document.body)
