import React from 'react'

function Board(props) {
	const drop = (e) => {
		e.preventDefault()

		const card_id = e.dataTransfer.getData('card_id')
		const card = document.getElementById(card_id)
		card.style.visibility = 'visible'

		e.target.appendChild(card)
	}

	return (
		<div
			id={props.id}
			className={props.className}
			onDrop={drop}
			onDragOver={(e) => e.preventDefault()}
		>
			{props.children}
		</div>
	)
}

export default Board
