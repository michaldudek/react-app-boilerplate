import React, { Component } from 'react'
import Helmet from 'react-helmet'

import style from './szkotka.css'

export default class Szkotka extends Component {
  render () {
    const { match } = this.props

    return (
      <div className={style.wrap}>
        <Helmet>
          <title>{match.params.name}</title>
        </Helmet>
        <h4>This is {match.params.name}!</h4>
        <img src='/images/szkotka.svg' className={style.image} />
      </div>
    )
  }
}
