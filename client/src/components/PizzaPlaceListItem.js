import React from "react";
import { Link } from "react-router-dom";

const PizzaPlaceListItem = ({ pizzaPlace, deletePizzaPlace }) => {

	const handleDeletePlaceClick = event => {
		event.preventDefault()
		deletePizzaPlace(pizzaPlace.id)
	}

	let deleteButton =  <input className='button' type='button' value='Delete' onClick={handleDeletePlaceClick}/>
  // if (currentUser && currentUser.id === userId) {
  //   deleteButton = <input className='button' type='button' value='Delete' onClick={handleDeletePlaceClick}/>
  // }

	return (

			<li className="pizza-list-item"> 
				<img className="list-logo" src={pizzaPlace.imageUrl} alt="restaurant logo"/>
				<Link to={`/pizza-places/${pizzaPlace.id}/`}>{pizzaPlace.name}</Link>
				{deleteButton}
			</li>
			
	)
}

export default PizzaPlaceListItem