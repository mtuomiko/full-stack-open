import React from 'react'

const Filter = (props) => {
  const {filter, handleFilterChange} = props

  return (
    <div>
      Filter names with&nbsp;
      <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

export default Filter