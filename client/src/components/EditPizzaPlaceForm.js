import React, { useState, useEffect } from 'react'
import translateServerErrors from '../services/translateServerErrors.js'
import ErrorList from './layout/ErrorList.js'

const EditPizzaPlaceForm = ({ pizzaPlace,  pizzaId, pizzaPlacesList, setPizzaPlacesList, setShowEditPlaceForm }) => {
	const { name, address, phoneNumber, website, hours, imageUrl} = pizzaPlace
  const [editedPizzaPlace, setEditedPizzaPlace] = useState(false)
	const [errors, setErrors] = useState({})

	const editPizzaPlace = async (editedPizzaPlace) => {
    try {
      const response = await fetch(`/api/v1/pizza-places/${pizzaId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(editedPizzaPlace)
      })
      if (!response.ok) { 
        if (response.status === 422){
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          throw new Error(`${response.status} (${response.statusText})`)
        }
      } else {
        const body = await response.json()
        return body.editedPizzaPlace
      }
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

	const handleSubmit = async event => {
		event.preventDefault()
		const newlyEditedPizzaPlace = await editPizzaPlace(editedPizzaPlace)
		const editedPizzaPlacesList = pizzaPlacesList
		const updateId = pizzaPlacesList.findIndex(element => element.id === newlyEditedPizzaPlace.id)
		editedPizzaPlacesList[updateId] = newlyEditedPizzaPlace
		setPizzaPlacesList(
			editedPizzaPlacesList
		)
		setShowEditPlaceForm(false)
	}

	const handleInputChange = event => {
		setEditedPizzaPlace({
			...editedPizzaPlace,
			[event.currentTarget.name]: event.currentTarget.value
		})
	}
	
	// useEffect(() => {
	// 	handleSubmit()
	// }, [])

  return (
    <form onSubmit={handleSubmit} >
		<ErrorList errors={errors}/>
		<label htmlFor='name'>
			Name:
			<input 
				type='text' 
				name='name'
				onChange={handleInputChange} 
				value={name}
			/>
		</label>

		<label htmlFor='address'>
			Address:
			<input 
				type='text' 
				name='address'
				onChange={handleInputChange} 
				value={address}
			/>
		</label>

		<label htmlFor='phoneNumber'>
			Phone Number:
			<input 
				type='text' 
				name='phoneNumber'
				onChange={handleInputChange} 
				value={phoneNumber}
			/>
		</label>

		<label htmlFor='website'>
			Website Address:
			<input 
				type='text' 
				name='website'
				onChange={handleInputChange} 
				value={website}
			/>
		</label>

		<label htmlFor='hours'>
			Hours:
			<input 
				type='text' 
				name='hours'
				onChange={handleInputChange} 
				value={hours}
			/>
		</label>

		<label htmlFor='imageUrl'>
			Add Photo (image url):
			<input 
				type='text' 
				name='imageUrl'
				onChange={handleInputChange} 
				value={imageUrl}
			/>
		</label>
		
		<input className='button' type='submit' value='Submit' />
		
	</form>
  )
}


export default EditPizzaPlaceForm