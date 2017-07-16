/*
 * Component Needs
 *
 * Block rendering of a component until its needs (requirements / conditions) are met.
 * Call a function if they are not met.
 * Render alternative components while getting the needs (e.g. waiting for API response) or meeting the conditions
 * has failed after the needs have been met.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Easy (and default) way of wrapping a component in needs.
 *
 * Usage:
 *
 *    needs((ownProps) => ({
 *      condition: [bool based on ownProps],
 *      needs: [function to call in order the fulfill condition if necessary],
 *      needsInProgress: [bool indicating if needs are being fetched currently or not],
 *      progressComponent: [component to render during progress],
 *      blockedComponent: [component to render after condition hasn't been met]
 *    }))(MyComponent)
 * 
 * @param  {Object|Function} mapProps Object of required props or a function that returns such object.
 * @return {Function}
 */
export default function needs (mapProps = {}) {
  const propsMapper = typeof mapProps === 'function' ? mapProps : () => mapProps

  return (WrappedComponent) => provideComponent(WrappedComponent, propsMapper)
}

export class NeedyComponent extends Component {

  static propTypes = {
    condition: PropTypes.bool.isRequired,
    needs: PropTypes.func,
    component: PropTypes.func.isRequired,
    needsInProgress: PropTypes.bool,
    progressComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    blockedComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
  }

  static defaultProps = {
    needs: () => null,
    needsInProgress: false,
    progressComponent: () => false,
    blockedComponent: () => false
  }

  /**
   * Constructor.
   *
   * @param  {Object} props Props
   */
  constructor (props) {
    super(props)
    this.needsCalled = false
  }

  componentWillMount () {
    this.checkNeeds(this.props)
  }

  componentWillUpdate (nextProps) {
    this.checkNeeds(nextProps)
  }

  /**
   * Check if there are any needs that need to be called.
   *
   * @param  {Object} props Props to base the decision on.
   * @return {Boolean}
   */
  checkNeeds (props) {
    const {
      condition,
      needs
    } = props

    if (condition) {
      this.needsCalled = false
      return true
    }

    if (!this.needsCalled) {
      needs()
      this.needsCalled = true
      return
    }

    return false
  }

  render () {
    const {
      condition,
      component,
      needs,
      needsInProgress,
      progressComponent,
      blockedComponent,
      ...props
    } = this.props

    if (!condition) {
      // need to capitalize so that JSX parser picks these up as components
      const Blocked = blockedComponent
      const Progress = progressComponent

      return needsInProgress
        ? (typeof Progress === 'function' ? <Progress {...props} /> : Progress)
        : (typeof Blocked === 'function' ? <Blocked {...props} /> : Blocked)
    }

    const WrappedComponent = component
    return <WrappedComponent {...props} />
  }
}

/**
 * Provides wrapping components generated for the WrappedComponent.
 *
 * @param  {Component} WrappedComponent React Component to be wrapped.
 * @param  {Function}  propsMapper      Function that resolves props.
 * @return {Class}
 */
function provideComponent (WrappedComponent, propsMapper) {
  const componentName = getComponentName(WrappedComponent)

  class NeedsWrapper extends NeedyComponent {
    static displayName = `NeedyComponent(${componentName})`
  }

  class Wrapper extends Component {
    static displayName = `Needs(${NeedsWrapper.displayName})`

    render () {
      const allProps = {
        ...this.props,
        ...propsMapper(this.props)
      }

      return (
        <NeedsWrapper
          {...allProps}
          component={WrappedComponent}
        />
      )
    }
  }

  return Wrapper
}

/**
 * Get component name easily.
 *
 * @param  {Component|Function} component React component.
 * @return {String}
 */
function getComponentName(component) {
  return component.displayName || component.name || 'Unknown'
}
