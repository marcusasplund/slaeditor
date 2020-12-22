/* global btoa, localStorage */
import { h, text, app } from 'hyperapp'
import './styles/app.scss'

const storageKey = 'editor'

const saveToLocalStorage = (state) => localStorage.setItem(storageKey, JSON.stringify(state))

const getFromLocalStorage = () => JSON.parse(localStorage.getItem(storageKey))

const exampleCSS = ''

const exampleHTML = '<div id="app"></div>'

const exampleJS = `
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text) {
       return false;
    }

    this.setState(prevState => ({
      list: prevState.list.concat(this.state.text),
      text: ''
    }))
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    })
  }

  removeItem(item) {
    const newList = this.state.list.filter(text => text !== item)
    this.setState({ list: newList})
  }

  render() {
    return (
      <div>
       <pre><code>{JSON.stringify(this.state)}</code></pre>
        <h1>Todo list</h1>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.text} onChange={e => this.handleChange(e)} />
          <button>Add</button>
          <table>
            {this.state.list.map(item => {
              return (
                <tr key={item}>
                  <td>{item}</td>
                  <td><button onClick={() => this.removeItem(item)}>Delete</button></td>
                </tr>)
            })}
          </table>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<Todo />, document.getElementById('app'));`

const code = (style, html, js) => `
<html>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.min.css" integrity="sha512-xiunq9hpKsIcz42zt0o2vCo34xV0j6Ny8hgEylN3XBglZDtTZ2nwnqF/Z/TTCc18sGdvCjbFInNd++6q3J0N6g==" crossorigin="anonymous" />
    <style>
    ${style}
    </style>
    </head>
    <body>
    ${html}
    <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone/babel.min.js"></script>
    <script type="text/babel">
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
