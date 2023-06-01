import React from 'react'
import spinnerGif from './spinner.gif';

const Spinner = () => {
  return (
    <div className='text-center'>
      <img src={spinnerGif} alt="loading..." />
    </div>
  )
}

export default Spinner
