import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditPizzaPlaceForm from "./EditPizzaPlaceForm.js";
const PizzaPlaceListItem = ({ pizzaPlace, deletePizzaPlace, pizzaPlacesList, setPizzaPlacesList }) => {
	const [editForm, setEditForm] = useState(null)

	const handleDeletePlaceClick = event => {
		event.preventDefault()
		deletePizzaPlace(pizzaPlace.id)
	}

	const handleEditPlaceClick = event => {
		console.log(pizzaPlace.id)
		event.preventDefault()
		if(!editForm) {
			setEditForm(
				<EditPizzaPlaceForm 
				pizzaPlace={pizzaPlace} 
				pizzaId={pizzaPlace.id}
				pizzaPlacesList={pizzaPlacesList}
				setPizzaPlacesList={setPizzaPlacesList}
				setEditForm={setEditForm}/>
			)
		}
	}

	let deleteButton =  <input className='button' type='button' value='Delete' onClick={handleDeletePlaceClick}/>
	let editButton =  <input className='button' type='button' value='Edit' onClick={handleEditPlaceClick}/>
  // if (currentUser && currentUser.id === userId) {
  //   deleteButton = <input className='button' type='button' value='Delete' onClick={handleDeletePlaceClick}/>
  // }

	return (
		<div>
			<li className="pizza-list-item"> 
				<img className="list-logo" src={pizzaPlace.imageUrl} alt="restaurant logo"/>
				<Link to={`/pizza-places/${pizzaPlace.id}/`}>{pizzaPlace.name}</Link>
			</li>
			{editButton}
			{deleteButton}
			{editForm}
		</div>
	)
}

export default PizzaPlaceListItem