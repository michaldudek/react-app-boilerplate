import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

import routes from 'routes'

import style from './app.css'

export default class App extends Component {
  render () {
    return (
      <div className={style.container}>
        {/* Using Helmet for controlling HTML <head> for easy React use and overwriting */}
        {/* DO NOT REMOVE */}
        <Helmet
          defaultTitle='Pałys & Dudek React App Boilerplate'
          titleTemplate='%s | Pałys & Dudek React Boilerplate'
        >
          <html lang='en' />
          <meta charset='utf-8' />
          <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
          <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <link rel='shortcut icon' href='/favicon.png' />
        </Helmet>

        {/* App html */}
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
