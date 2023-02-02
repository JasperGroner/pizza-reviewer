import React, { useEffect, useState } from "react"
import ReviewItem from "./ReviewItem.js"

const PizzaPlaceShow = props => {
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
		const pizzaId = props.match.params.id
		try {
			const response = await fetch(`/api/v1/pizza-places/${pizzaId}`)
			if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
			const pizzaData = await response.json()
			debugger
			setPizzaPlace(pizzaData.pizzaPlace)
		} catch(error) {
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
			/>
		)
	}) 


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
		</div>
	)
}

export default PizzaPlaceShow