import React, { Component } from 'react'
import Helmet from 'react-helmet'

import style from './info.css'

export default class Info extends Component {
  render () {
    return (
      <div className={style.wrap}>
        <Helmet>
          <title>Info</title>
        </Helmet>
        <h4>Some information</h4>
        <p>Lorem ipsum...</p>
      </div>
    )
  }
}
