import React, {useState } from "react"
import ErrorList from "./layout/ErrorList"

const NewReviewForm = props => {
  const [newReview, setNewReview] = useState({
    userId: props.currentUser.id,
    rating: 3,
    title: "",
    text: ""
  })

  const [errors, setErrors] = useState({})

  const postNewReview = async(newReviewData) => {
    const pizzaId = props.pizzaId
    try {
      const response = await fetch(`/api/v1/pizza-places/${pizzaId}/reviews/new`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newReviewData)
      })
      if (!response.ok) {
				if (response.status === 422){
					const body = await response.json()
					const newErrors = translateServerErrors(body.errors)
					return setErrors(newErrors)
				} else {
					throw new Error(`${response.status} (${response.statusText})`)
				}
      } else {
        const body = await response.json()
        return body
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const handleInputChange = event => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const reviewData = postNewReview(newReview)
    props.setPizzaPlace({
      ...pizzaPlace,
      reviews: [...reviews, reviewData]
    })
    clearForm()
  }

  const clearForm = () => {
    setNewReview({
      userId: props.currentUser.id,
      rating: 3,
      title: "",
      text: ""
    })
  }

  return (
    <div>
      <h1>Add New Review</h1>
      <form onSubmit={handleSubmit} >
        <ErrorList errors={errors}/>
        <label htmlFor="rating">
          Rating:
          <input
            type="range"
            min="1" 
            max="5"
            step="0.5"
            onChange={handleInputChange}
            value={newReview.value}
            id="rating" 
            name="rating"
          />
        </label>
        
        {newReview.rating} stars
        
        <label htmlFor="title">
          Title of Review:
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleInputChange}
            value={newReview.title}
          />
        </label>

        <label htmlFor="text">
          Text of Review:
          <textarea
            name="text"
            id="text"
            onChange={handleInputChange}
            value={newReview.text}
          />
        </label>
        
        <input className='button' type='submit' value='Submit' />
		    <input className='button' type='button' value='Clear Form' onClick={clearForm}/> 

      </form>
    </div>
  )
}

export default NewReviewForm