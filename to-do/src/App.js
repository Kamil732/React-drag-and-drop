import React, { useState } from 'react'
import main from './assets/css/main.css'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const finalCharacters = [
	{
		id: 'gary',
		name: 'Gary Goodspeed',
	},
	{
		id: 'cato',
		name: 'Little Cato',
	},
	{
		id: 'kvn',
		name: 'KVN',
	},
	{
		id: 'mooncake',
		name: 'Mooncake',
	},
	{
		id: 'quinn',
		name: 'Quinn Ergon',
	},
]

function App() {
	const [characters, setCharacters] = useState(finalCharacters)

	const handleOnDragEnd = (result) => {
		if (!result.destination) return

		const items = Array.from(characters)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)

		setCharacters(items)
	}

	return (
		<div className="app">
			<header className="app-header">
				<h1>Final Space Characters</h1>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="characters">
						{(provided) => (
							<ul
								className="characters"
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{characters.map(({ id, name }, index) => (
									<Draggable
										key={id}
										draggableId={id}
										index={index}
									>
										{(provided) => (
											<li
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												ref={provided.innerRef}
											>
												<p>{name}</p>
											</li>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>
			</header>
		</div>
	)
}

export default App
