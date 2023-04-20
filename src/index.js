/* global btoa */
/** @jsx h */
/**
 * This script provides a web-based tool that converts HTML code into a base64-encoded link.
 * The link can be copied and pasted into a browser's address bar to view the web content.
 */

import { h, app, text } from 'hyperapp'
import './styles/app.scss'

// Example HTML code to demonstrate the functionality
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

// Initial state of the application
const initialState = {
  parsed: '',
  code: '',
  copied: false,
  example,
  placeholder: 'Paste your awesome website/app code here'
}

/**
 * Updates the state with the base64-encoded version of the input HTML code
 *
 * @param {object} state - The current state of the app.
 * @param {object} event - The input event containing the HTML code.
 * @returns {object} The updated state.
 */
const ParseString = (state, event) => ({
  ...state,
  copied: false,
  parsed: btoa(event.target.value)
})

/**
 * Copies the example HTML code to the editor area
 *
 * @param {object} state - The current state of the app.
 * @returns {object} The updated state.
 */
const CopyExampleCode = (state) => ({
  ...state,
  copied: true,
  code: example,
  parsed: btoa(example)
})

/**
 * Creates a textarea element for the input HTML code
 *
 * @param {object} props - The properties for the textarea element.
 * @returns {object} The textarea element.
 */
const TextArea = ({ parsed, placeholder, code }) => (
  h('textarea', {
    id: 'codearea',
    oninput: ParseString,
    parsed,
    placeholder
  }, text(code))
)

/**
 * Creates a section element that displays the base64-encoded link
 *
 * @param {object} props - The property for the section element.
 * @returns {object} The section element.
 */
const Result = ({ parsed }) => (
  h('section', {}, [
    h('p', {}, text('Below is your app as a base64-encoded link that you can copy and paste in your browsers address bar')),
    h('pre', {}, h('code', {}, text(`data:text/html;base64, ${parsed}`))),
    h('hr', {})
  ])
)

/**
 * Creates a section element that demonstrates how to use the tool
 *
 * @param {object} props - The property for the section element.
 * @returns {object} The section element.
 */
const Test = ({ example }) => (
  h('section', {}, [
    h('p', {}, text('To try it out; copy the example code below, paste in the left pane, then copy the base64 result produced above and paste in a browser address bar')),
    h('br', {}),
    h('button', { onclick: CopyExampleCode }, text('copy example to editorarea')),
    h('pre', {}, h('code', {}, text(example)))
  ])
)

// Initialize the app with the initial state and the view function
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
      ])
    ])
  ),
  node: document.getElementById('app')
})
