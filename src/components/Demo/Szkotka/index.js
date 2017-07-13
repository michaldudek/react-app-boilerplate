import React, { Component } from 'react'

import style from './szkotka.css'

export default class Szkotka extends Component {
  render () {
    const { match } = this.props

    return (
      <div className={style.wrap}>
        <h4>This is {match.params.name}!</h4>
        <img src='/images/szkotka.svg' className={style.image} />
      </div>
    )
  }
}
