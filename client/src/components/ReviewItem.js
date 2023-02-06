import React from 'react'

const ReviewListItem = ({ title, rating, text, deleteReview, id, currentUser }) => {

  const handleDeleteClick = event => {
		event.preventDefault()
		deleteReview(id)
	  }

    let button =""
    if(currentUser){
      button = <input className='button' type='button' value='Delete' onClick={handleDeleteClick}/>
    }

  return (
    <>
        <h6>Title: {title}</h6>
        <p>Rating: {rating}</p>
        <p>User Review: {text}</p>
        {button}
    </>
  )
}

export default ReviewListItem