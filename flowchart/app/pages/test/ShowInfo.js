import React, { Component } from 'react'

class ShowInfo extends Component {

  render () {
    return (
      <div style={{
          position: 'absolute',
          width:400,
          backgroundColor: '#fff',
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
          border: '1px solid #CCC',
          borderRadius: 3,
          marginLeft: -5,
          marginTop: 5,
          padding: 10,
          zIndex:1200
        }}>
        <p>Check this info</p>
      </div>
    )
  }
}

export default ShowInfo
