import React from 'react'
import { connect } from 'react-redux'
import { clearAll } from '../action/index'
import PropTypes from 'prop-types'

const mapStateToProps = state => {
  console.log(state)
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    clearAllFunc: () => {
      dispatch(clearAll());
    }
  }
}

let ClearItem = ({ clearAllFunc }) => {
  return (
    <div>
      <button onClick={clearAllFunc}>
        clearAll
      </button>
    </div>
  )
}

ClearItem.prototypes = {
  clearAllFunc: PropTypes.func.isRequired
}

ClearItem = connect(mapStateToProps,mapDispatchToProps)(ClearItem)

export default ClearItem