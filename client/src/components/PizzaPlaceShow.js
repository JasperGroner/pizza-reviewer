import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const PizzaPlaceShow = props => {
	console.log(props)
	const [pizzaPlace, setPizzaPlace] = useState({})

	const getPizzaPlace = async () => {
		const pizzaId = props.match.params.id
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

	let newReviewLink = ""
	if (props.user) {
		newReviewLink = <Link to="reviews/new">Add new review</Link>
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
			{newReviewLink}
		</div>
	)
}

export default PizzaPlaceShow