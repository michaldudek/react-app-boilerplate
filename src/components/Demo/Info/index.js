import React, { Component } from 'react'

import style from './info.css'

export default class Info extends Component {
  render () {
    return (
      <div className={style.wrap}>
        <h4>Some information</h4>
        <p>Lorem ipsum...</p>
      </div>
    )
  }
}
