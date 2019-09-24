/* global btoa */
/** @jsx h */
import { h, app } from 'hyperapp'
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
        import { h, app } from "https://unpkg.com/hyperapp"

        app({
          init: 0,
          view: state =>
            h("div", {}, [
              h("h1", {}, state),
              h("button", { onClick: state => state - 1 }, "-"),
              h("button", { onClick: state => state + 1 }, "+")
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

const TextArea = ({ state }) => (
  <textarea
    id='codearea'
    onInput={[ParseString, targetValue]}
    placeholder={state.placeholder}
  >
    {state.code}
  </textarea>
)

const Result = ({ state }) => (
  <section>
    <a href={`data:text/html;base64, ${state.parsed}`}>
      <p>
      In some browsers you can right click this link and open in a new tab*<br />
      </p>
    </a>
    <p>
      <small>*Due to browser restrictions it does not work to open such a link in the same window</small>
    </p>
    <hr />
    <p>
    Below is your app as a base64-encoded link that you can copy and paste in your browsers adress bar
      <br />
    </p>
    <pre>
      <code>
    data:text/html;base64, {state.parsed}
      </code>
    </pre>
    <hr />
  </section>
)

const Test = ({ state }) => (
  <section>
    <p>
    To try it out; copy the example code below, paste in the left pane, then copy the base64 result produced above and paste in a browser address bar
      <br />
      <button onClick={CopyExampleCode}>copy example to textarea</button>
    </p>
    <pre>
      <code>
        {state.example}
      </code>
    </pre>
  </section>
)

app({
  init: initialState,
  view: state => (
    <div id='editor'>
      <TextArea state={state} />
      <div>
        {state.parsed ? <Result state={state} /> : ''}
        {state.copied ? '' : <Test state={state} />}
      </div>
      <p>You can look at the code <a href='https://github.com/marcusasplund/slaeditor'>here</a></p>
    </div>),
  node: document.getElementById('app')
})
