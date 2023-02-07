import React from "react"
import pizzaStar from "../assets/pizza.png"

const PizzaImageArray = ({rating}) => {
  let reviewStars = []
  for (let i = 0; i < rating; i++) {
    reviewStars.push(<img className="pizza-star" src={pizzaStar} key={i}/>)
  }
  return <>{reviewStars}</>
}

export default PizzaImageArray