import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import translateServerErrors from '../services/translateServerErrors.js'

const NewPizzaPlaceForm = () => {
    
    const [newPizzaPlace, setNewPizzaPlace] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        website: "",
        hours: "",
        imageUrl: ""
    })
    
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const postNewPizzaPlace = async(newPizzaPlaceData) => {
        try {
            const response = await fetch("/api/v1/pizza-places", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(newPizzaPlaceData)
            })
            console.log(response)
            if(!response.ok) {
                if(response.status === 422){
                    const body = await response.json()
                    const newErrors = translateServerErrors(body.errors)
                    return setErrors(newErrors)
                }else{
                    throw new Error(`${response.status} (${response.statusText})`)
                }
            } else {
                const body = await response.json()
                              
                setShouldRedirect(true)
               
            }
        } catch(error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }


    const handleInputChange = (event) => {
        setNewPizzaPlace({
            ...newPizzaPlace,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        postNewPizzaPlace(newPizzaPlace)
        clearForm()
    }

    const clearForm = () => {
        setNewPizzaPlace({
            name: "",
            address: "",
            phoneNumber: "",
            website: "",
            hours: "",
            imageUrl: ""
        })
    }

    if(shouldRedirect) {
        return <Redirect push to="/pizza-places" />
    }

  return (
    <form onSubmit={handleSubmit} >

        <label htmlFor='name'>
            Name:
            <input 
                type='text' 
                name='name'
                onChange={handleInputChange} 
                value={newPizzaPlace.name}
            />
        </label>

        <label htmlFor='address'>
            Address:
            <input 
                type='text' 
                name='address'
                onChange={handleInputChange} 
                value={newPizzaPlace.address}
            />
        </label>

        <label htmlFor='phoneNumber'>
            Phone Number:
            <input 
                type='text' 
                name='phoneNumber'
                onChange={handleInputChange} 
                value={newPizzaPlace.phoneNumber}
            />
        </label>

        <label htmlFor='website'>
            Website Address:
            <input 
                type='text' 
                name='website'
                onChange={handleInputChange} 
                value={newPizzaPlace.website}
            />
        </label>

        <label htmlFor='hours'>
            Hours:
            <input 
                type='text' 
                name='hours'
                onChange={handleInputChange} 
                value={newPizzaPlace.hours}
            />
        </label>

        <label htmlFor='imageUrl'>
            Add Photo (image url):
            <input 
                type='text' 
                name='imageUrl'
                onChange={handleInputChange} 
                value={newPizzaPlace.imageUrl}
            />
        </label>

        <div>
            <input className='button' type='submit' value='Submit' />
            <input className='button' type='button' value='Clear Form' onClick={clearForm}/>
        </div>
        
    </form>
  )
}

export default NewPizzaPlaceForm