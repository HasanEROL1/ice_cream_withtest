import React from 'react'

const Error = ({ info }) => {
  return (
    <div data-testid="list-error">
      Error: {info}
    </div>
  )
}

export default Error