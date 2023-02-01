import React, { useState, useEffect } from 'react'
import PizzaPlaceListItem from './PizzaPlaceListItem.js'
import { Link } from 'react-router-dom'

const PizzaPlaceList = (props) => {
    const [pizzaPlacesList, setPizzaPlacesList] = useState([])
    const getPizzaPlaces = async () => {
        try {
            const response = await fetch("/api/v1/pizza-places")
            if(!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            } else {
                const body = await response.json()
                setPizzaPlacesList(body.pizzaPlaces)
            }
        } catch(error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getPizzaPlaces()
    }, [])

    const pizzaPlaceReact = pizzaPlacesList.map(pizzaPlace => {
        return (
            <PizzaPlaceListItem pizzaPlace={pizzaPlace} key={pizzaPlace.id}/>
        )
    })

    return (
        <div className='pizza-list'>
            <h1>Pizza Place List</h1>
            <ul>{pizzaPlaceReact}</ul>
            <Link to='/pizza-places/new' >Add New Pizza Place</Link>
        </div>
    )
}

export default PizzaPlaceList