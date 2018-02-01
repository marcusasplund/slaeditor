/* global btoa */
import {h, app} from 'hyperapp'
import debounce from 'lodash.debounce'
import './styles/app.scss'

/** @jsx h */
const state = {
  parsed: ``
}
const go = (str) => {
  console.log(str)
  console.log(btoa(str))
  return btoa(str)
}
const actions = {
  parseString: str => state => ({
    parsed: go(str)
  })
}

const TextArea = ({parse}) => (
  <textarea
    oninput={debounce(parse, 200)}
    placeholder='Paste your awesome website/app code here' />
)

const view = (state, actions) => (
  <div id='editor'>
    <TextArea parse={e => actions.parseString(e.target.value)} />
    <div>
      <a href={`data:text/html;base64, ${state.parsed}`}>
        <p>
          This is a link you can right click and open in a new tab*<br />
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
        And below is some code to try it out; paste in the left pane, copy the result produced above and paste in a browser address bar
      </p>
      <pre>
        <code>
           &lt;h1&gt; hello, i am a SLA application&lt;/h1&gt;
        </code>
      </pre>
    </div>
  </div>
)

app(state, actions, view, document.body)
