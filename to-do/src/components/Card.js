import React from 'react'

function Card(props) {
	const dragStart = (e) => {
		e.dataTransfer.setData('card_id', e.target.id)

		setTimeout(() => {
			e.target.style.visibility = 'hidden'
		}, 0)
	}

	const dragOver = (e) => {
		e.stopPropagation()
	}

	return (
		<div
			id={props.id}
			className={props.className}
			draggable={props.draggable}
			onDragStart={dragStart}
			onDragOver={dragOver}
		>
			{props.children}
		</div>
	)
}

export default Card
