import React, { Component } from 'react'

import style from './root.css'

export default class Root extends Component {
  render () {
    return (
      <div className={style.root}>
        <h1 className={style.title}>React App Skeleton</h1>
        <h2 className={style.subtitle}>By Pałys & Dudek</h2>
        <img src='/images/szkotka.svg' className={style.image} />
      </div>
    )
  }
}
