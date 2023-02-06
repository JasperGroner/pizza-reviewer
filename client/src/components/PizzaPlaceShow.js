import React, { useEffect, useState } from "react"
import ReviewItem from "./ReviewItem.js"
import NewReviewForm from "./NewReviewForm.js"

const PizzaPlaceShow = props => {

	const pizzaId = props.match.params.id
	const currentUser = props.currentUser
	const [pizzaPlace, setPizzaPlace] = useState({
		address: "",
		hours: "",
		imageUrl: "",
		name: "",
		phoneNumber: "",
		reviews: [],
		website: ""
	})

	const getPizzaPlace = async () => {
		try {
			const response = await fetch(`/api/v1/pizza-places/${pizzaId}`)
			if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
			const pizzaData = await response.json()
			setPizzaPlace(pizzaData.pizzaPlace)
		} catch(error) {
			console.error(`Error in fetch: ${error.message}`)
		}
	}
	const deleteReview = async (id) => {
		try{
			const response = await fetch(`/api/v1/pizza-places/${pizzaId}/reviews/${id}`, {
					method: "DELETE",
					headers: new Headers({
					"Content-Type": "application/json"
					})
				})
				if (!response.ok){
					throw new Error(`${response.status} (${response.statusText})`)
				}
				setPizzaPlace({
					...pizzaPlace,
					reviews: pizzaPlace.reviews.filter(review => review.id !== id)
				  });
		}catch(error) {
			console.error(`Error in fetch: ${error.message}`)
		}
	}
	

	useEffect(() => {
		getPizzaPlace()
	}, [])

	const reviewItems = pizzaPlace.reviews.map(reviewItem => {
		return (
			<ReviewItem 
				key= {reviewItem.id}
				{...reviewItem}
				deleteReview={deleteReview}
				currentUser={currentUser}
			/>
		)
	}) 

	let newReview = ""
	if (currentUser) {
		newReview = <NewReviewForm 
			pizzaId={pizzaId} 
			currentUser={currentUser} 
			setPizzaPlace={setPizzaPlace}
			pizzaPlace={pizzaPlace}
			deleteReview={deleteReview}
		/>

		
	}

	return (
		<div className="show-page">
			<h1>{pizzaPlace.name}</h1>
			<div className="show-page-flex">
				<div className="show-page-info">
					<p>Address: {pizzaPlace.address}</p>
					<p>Phone Number: {pizzaPlace.phoneNumber}</p>
					<p>Website: 
						<a href={pizzaPlace.website} target="_blank"> {pizzaPlace.website}</a>
					</p>
					<p>Hours: {pizzaPlace.hours}</p>    
				</div>
				<img src={pizzaPlace.imageUrl} className="show-page-image" />
			</ div>
			<div>
				<h4>Reviews</h4>
				{reviewItems}
			</div>
			{newReview}
		</div>
	)
}

export default PizzaPlaceShow