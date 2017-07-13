import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import routes from 'routes'

import style from './app.css'

export default class App extends Component {
  render () {
    return (
      <div className={style.container}>
        <nav className={style.nav}>
          <Link to='/szkotka/Brendy' className={style.navLink}>Szkotka Brendy</Link>
          <Link to='/szkotka/Bosfor' className={style.navLink}>Szkot Bosfor</Link>
          <Link to='/szkotka/Mietka' className={style.navLink}>Szkotka Mietka</Link>
          <Link to='/info' className={style.navLink}>Info</Link>
        </nav>

        <h1 className={style.title}>React App Boilerplate</h1>
        <h2 className={style.subtitle}>By Pałys & Dudek</h2>

        <div className={style.content}>
          {routes}
        </div>
      </div>
    )
  }
}
