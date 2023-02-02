import React, { useEffect, useState } from "react"

import NewReviewForm from "./NewReviewForm.js"

const PizzaPlaceShow = props => {
	const [pizzaPlace, setPizzaPlace] = useState({})
	const pizzaId = props.match.params.id

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

	useEffect(() => {
		getPizzaPlace()
	}, [])

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
			<NewReviewForm pizzaId={pizzaId}/>
		</div>
	)
}

export default PizzaPlaceShow