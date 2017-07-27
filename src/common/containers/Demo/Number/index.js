import React from 'react'
import { connect } from 'react-redux'
import { needs } from 'react-component-needs'

import { demoAction } from 'actions/demo'
import DemoNumber from 'components/Demo/Number'

export default connect(
  (state) => ({
    number: state.demo.number,
    result: state.demo.result,
    changed: state.demo.changed,
    processing: state.demo.processing
  }),
  (dispatch, ownProps) => ({
    calculateNumber: () => dispatch(demoAction(ownProps.match.params.num))
  })
)(needs(
  (ownProps) => ({
    condition: !ownProps.processing && parseInt(ownProps.match.params.num) === ownProps.number,
    needs: ownProps.calculateNumber,
    needsInProgress: ownProps.processing,
    progressComponent: <div>Calculating...</div>,
    blockedComponent: (props) => <div>{JSON.stringify(props)}</div>
  })
)(DemoNumber))
