import React from "react";

const UploadTile = (props)=>{

	return (
		<>
			<div className="load secondary">
				<h3>{props.upload.title}</h3>
				<img src={props.upload.image} />
			</div>
		</>
	)
}

export default UploadTile