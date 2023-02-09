import React, { useEffect, useState } from "react"
import Dropzone from "react-dropzone"

const UploadUserImage = ({ userPayload, setUserPayload }) =>{
	const [newUploadFormData, setNewUploadFormData] = useState({
		image: {}
	})

	const [source, setSource] = useState("")
	const [buttonValue, setButtonValue] = useState("Add Image")

	const handleImageUpload = (acceptedImage) => {
		setNewUploadFormData({
			...newUploadFormData,
			image: acceptedImage[0]
		})
		const reader = new FileReader()
		reader.onload = () => {
			setSource(reader.result)
		} 
		reader.readAsDataURL(acceptedImage[0])
	}

	const addUpload = (event) => {
		event.preventDefault()
		setUserPayload({
			...userPayload,
			image: newUploadFormData.image
		})
		setButtonValue("Image Added!")
	}

	return (
		<>
			<h5>Profile Image Uploads</h5>

			<form className="load primary" onSubmit={addUpload}>

				<Dropzone onDrop={handleImageUpload}>
					{({getRootProps, getInputProps})=>(
						<section>
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<p>Upload your profile Image- drag 'n' drop or click to upload</p>
							</div>
						</section>
					)}
				</Dropzone>
				<p>
					Preview: <img src={source} />
				</p>
				<input className="button" type="submit" value={buttonValue} />
			</form>
		</>
	)
}

export default UploadUserImage
