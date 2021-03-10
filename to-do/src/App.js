import React from 'react'
import main from './assets/css/main.css'

import Board from './components/Board'
import Card from './components/Card'

function App() {
	return (
		<div
			className="flexbox"
			onDrop={(e) => {
				e.preventDefault()
				const card_id = e.dataTransfer.getData('card_id')
				const card = document.getElementById(card_id)
				card.style.visibility = 'visible'
			}}
			onDragOver={(e) => e.preventDefault()}
		>
			<Board id="board-1" className="board">
				<Card id="card-1" className="card" draggable="true">
					<p>Card 1</p>
				</Card>
				<Card id="card-2" className="card" draggable="true">
					<p>Card 2</p>
				</Card>
			</Board>
			<Board id="board-2" className="board">
				<Card id="card-3" className="card" draggable="true">
					<p>Card 3</p>
				</Card>
			</Board>
		</div>
	)
}

export default App
