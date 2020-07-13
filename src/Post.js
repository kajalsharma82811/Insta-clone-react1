import React from 'react'
import yo3 from './yo3.jpg'
import style from './Post.css'


import Avatar from "@material-ui/core/Avatar"

function Post({username,imageUrl,caption}) {
	return (
		<div className = "post">
		 <div className = "post_header">
		<Avatar
		className = "post_avatar"
		alt = 'KajalSharma'
		src = "/static/images/avatar/1.jpg"
		/>
		<h3>{username}</h3>
		</div>

		<img
		 className = "post_image"
		 src = {imageUrl} 
		 alt = "yo"
		 />

		 <h4 className="post_text"><strong>{username}:</strong> {caption}</h4>

			
		</div>
	)
}

export default Post
