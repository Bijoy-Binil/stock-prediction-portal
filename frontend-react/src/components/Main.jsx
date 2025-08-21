import React from 'react'
import Button from './Button'
const Main = () => {
  return (
    <>
    <div className='container'>
        <div className='p-5 text-center bg-light-dark rounded'>
            <h1 className='text-light'>Stock Prediction Portal</h1>
            <p className='text-light lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quibusdam molestiae omnis natus, perspiciatis eius placeat repellendus ab nihil veniam eos quos reiciendis earum est rem ratione, iure et, modi deserunt reprehenderit excepturi a facilis sunt dicta? Dolores, ut sed.</p>
               <Button class={"btn-outline-info"} text={"Login"}/>
        </div>
    </div>
    </>
  )
}

export default Main