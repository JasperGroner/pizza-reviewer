import React from "react";

const UploadTile = (props)=>{

	return (
		<>
			<div className="load secondary">
				<img src={props.upload.image} />
			</div>
		</>
	)
}

export default UploadTile
