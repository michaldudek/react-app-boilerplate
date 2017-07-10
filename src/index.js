// import React from 'react'
// import ReactDOM from 'react-dom'

// ReactDOM.render((
//   <div>
//     <h1>This is my page</h1>
//     <p>And I like my page!</p>
//   </div>
// ), document.getElementById('root'))

import _ from 'lodash'

import style from 'styles/base.css'

console.log('style', style)

const msg = []
msg.push('Hello')
msg.push('React!')

document.getElementById('root').innerHTML = _.join(msg.map((str) => str.toUpperCase()))
