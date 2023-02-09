import React, { useEffect, useState } from "react"
import Dropzone from "react-dropzone"

const UploadUserImage = ({ userPayload, setUserPayload }) =>{
	const [newUploadFormData, setNewUploadFormData] = useState({
		image: {}
	})

	const handleImageUpload = (acceptedImage)=>{
		setNewUploadFormData({
			...newUploadFormData,
			image: acceptedImage[0]
		})
	}

	const addUpload = (event)=>{
		event.preventDefault()
		setUserPayload({
			...userPayload,
			image: newUploadFormData.image
		})
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

				<input className="button" type="submit" value="Add" />
			</form>
		</>
	)
}

export default UploadUserImage
