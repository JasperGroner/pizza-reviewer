import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditPizzaPlaceForm from "./EditPizzaPlaceForm.js";
const PizzaPlaceListItem = ({ pizzaPlace, deletePizzaPlace, pizzaPlacesList, setPizzaPlacesList, currentUser }) => {
	const [showEditPlaceForm, setShowEditPlaceForm] = useState(false)
	
	const handleDeletePlaceClick = event => {
		event.preventDefault()
		deletePizzaPlace(pizzaPlace.id)
	}

	const handleEditPlaceClick = event => {
		event.preventDefault()
		setShowEditPlaceForm(showEditPlaceForm ? false : true)
	}

	let editForm
	if (showEditPlaceForm) {
		editForm = <EditPizzaPlaceForm 
			pizzaPlace={pizzaPlace} 
			pizzaId={pizzaPlace.id}
			pizzaPlacesList={pizzaPlacesList}
			setPizzaPlacesList={setPizzaPlacesList}
			setShowEditPlaceForm={setShowEditPlaceForm}/>
	}		

	let deleteButton
	let editButton 
  if (currentUser && currentUser.id === pizzaPlace.userId) {
		editButton =  <input className='button' type='button' value='Edit' onClick={handleEditPlaceClick}/>
    deleteButton = <input className='button' type='button' value='Delete' onClick={handleDeletePlaceClick}/>
  }

	return (
		<div className="pizza-place-tile">
			<img className="list-logo" src={pizzaPlace.imageUrl} alt="restaurant logo"/>
				<Link to={`/pizza-places/${pizzaPlace.id}/`}>{pizzaPlace.name}</Link>
			{editButton}
			{deleteButton}
			{editForm}
		</div>
	)
}

export default PizzaPlaceListItem