import React, { useEffect, useState } from "react"
import Dropzone from "react-dropzone"

const ChangeUserImage = (props) =>{
	const [newUploadFormData, setNewUploadFormData] = useState({
		image: {}
	})

	const [image, setImage] = useState()
	const [shouldRedirect, setShouldRedirect] = useState(false)

	const handleImageUpload = (acceptedImage)=>{
		setNewUploadFormData({
			...newUploadFormData,
			image: acceptedImage[0]
		})
	}

	const addUpload = async (event)=>{
		event.preventDefault()
		const newUploadBody = new FormData()
		newUploadBody.append("image", newUploadFormData.image)
		try {
			const response = await fetch("/api/v1/users",{
				method: "PATCH",
				headers: {
					"Accept": "image/jpeg"
				},
				body: newUploadBody
			})
			if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
			const body = await response.json()
			setImage(body.updatedUser.image)
			setShouldRedirect(true)
		} catch (error) {
			console.error(`Error in addUpload Fetch: ${error.message}`)
		}
	}

	if (shouldRedirect) {
		location.href = "/"
	}
	
	return (
		<div className="centered-content">
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

				<input className="button" type="submit" value="Change Profile Image" />
			</form>
			<img src={image} />
		</div>
	)
}

export default ChangeUserImage
