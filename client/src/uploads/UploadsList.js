import React, { useEffect, useState } from "react"
import Dropzone from "react-dropzone"

import UploadTile from "./UploadTile.js"

const UploadsList = (props) =>{
	const [uploads, setUploads] = useState ([])
	const [newUploadFormData, setNewUploadFormData] = useState({
		image: {}
	})

	const getUploads = async () =>{
		try {
			const response = await fetch("/api/v1/uploads")
			if (!response.ok){
				throw new Error(`{response.status} (${response.statusText})`)
			}
			const body = await response.json()
			setUploads(body.uploads)
		} catch (error){
			console.error(`Error in getFileUploads Fetch: ${error.message}`)
		}
	}

	useEffect(()=>{
			getUploads()
	}, [])

	const uploadTiles = uploads.map((upload)=>{
		return (
			<UploadTile
				key={upload.id}
				upload={upload}
			/>
		)
	})

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
			const response = await fetch("/api/v1/uploads",{
				method: "POST",
				headers: {
					"Accept": "image/jpeg"
				},
				body: newUploadBody
			})
			if (!response.ok) {
				throw new Error(`${response.status} (${response.statusText})`)
			}
			const body = await response.json()
			setUploads([
				...uploads,
				body.upload
			])
		} catch (error) {
			console.error(`Error in addUpload Fetch: ${error.message}`)
		}
	}

	return (
		<div>
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

			<div>
				{uploadTiles}
			</div>
		</div>
	)
}

export default UploadsList
