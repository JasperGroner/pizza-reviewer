import React, { useState, useEffect } from 'react'
import PizzaPlaceListItem from './PizzaPlaceListItem.js'
import { Link } from 'react-router-dom'

const PizzaPlaceList = (props) => {
  const currentUser = props.currentUser
  const [pizzaPlacesList, setPizzaPlacesList] = useState([])

  const getPizzaPlaces = async () => {
    try {
      const response = await fetch("/api/v1/pizza-places")
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      } else {
        const body = await response.json()
        setPizzaPlacesList(body.pizzaPlaces)
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const deletePizzaPlace = async (id) => {
    try {
			const response = await fetch(`/api/v1/pizza-places/${id}`, {
				method: "DELETE",
				headers: new Headers({
				"Content-Type": "application/json"
				})
			})
			if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
      setPizzaPlacesList(pizzaPlacesList.filter(pizzaPlace => pizzaPlace.id !== id))
		} catch(error) {
			console.error(`Error in fetch: ${error.message}`)
		}
	}

  useEffect(() => {
    getPizzaPlaces()
  }, [])

  const pizzaPlaceReact = pizzaPlacesList.map(pizzaPlace => {
    return (
      <PizzaPlaceListItem 
      pizzaPlace={pizzaPlace} 
      key={pizzaPlace.id} 
      currentUser={currentUser}
      deletePizzaPlace={deletePizzaPlace}
      pizzaPlacesList={pizzaPlacesList}
      setPizzaPlacesList={setPizzaPlacesList} />
    )
  })

  return (
    <div className='centered-content'>
      <h1>Pizza Place List</h1>
      {pizzaPlaceReact}
      <Link to='/pizza-places/new'> Add New Pizza Place </Link>
    </div>

  )
}

export default PizzaPlaceList