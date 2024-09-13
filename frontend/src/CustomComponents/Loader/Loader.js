import React from 'react'
import "./loader.css"

const Loader = ({color="red"}) => {
  return (
    <div style={{width:'100%' , height:'100%' , display:'flex' , justifyContent:'center' , alignItems:'center' , }} >
      <div style={{borderColor:color ,  }} id='small-loader' >
      </div>
    </div>
  )
}

export default Loader
