import React from "react";
import { Link } from "react-router-dom";

const PizzaPlaceListItem = ({ pizzaPlace }) => {
    return (
        <li className="pizza-list-item"> 
            <img className="list-logo" src={pizzaPlace.imageUrl} alt="restaurant logo"/>
            <Link to={`/pizza-places/${pizzaPlace.id}/`}>{pizzaPlace.name}</Link>
        </li>
    )
}

export default PizzaPlaceListItem