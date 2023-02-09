import React from "react";
import { Link } from "react-router-dom";

const PizzaPlaceListItem = ({ pizzaPlace }) => {
	return (
		<div className="pizza-place-tile"> 
			<img className="list-logo" src={pizzaPlace.imageUrl} alt="restaurant logo"/>
			<Link to={`/pizza-places/${pizzaPlace.id}/`}>{pizzaPlace.name}</Link>
		</div>
	)
}

export default PizzaPlaceListItem