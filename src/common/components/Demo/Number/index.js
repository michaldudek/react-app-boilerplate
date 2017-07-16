import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class Number extends Component {

  static propTypes = {
    number: PropTypes.number.isRequired,
    result: PropTypes.number.isRequired,
    processing: PropTypes.bool,
    resolved: PropTypes.bool
  }

  static defaultProps = {
    processing: false,
    resolved: false
  }

  render () {
    const {
      number,
      result,
      processing,
      resolved
    } = this.props

    return (
      <div>
        <b>Number: </b> <Link to={`/number/${number}`}>{number}</Link><br />
        <b>Result: </b> <Link to={`/number/${result}`}>{result}</Link><br />
        <b>Processing: </b> {processing ? '1' : '0'}<br />
        <b>Resolved: </b> {resolved ? '1' : '0'}
      </div>
    )
  }
}
