import React from 'react'

export default function Home() {
  
  return (
    <div className="container">
      <div className="text-center">
        <img src={require('../images/BudgetTracker.png')} alt="" className='rounded' width={750} />
      </div>
      <h3 className="text-center my-4">This is your OneStop Budget Tracking and Bill Splitting App</h3>
    </div>
  )
}
