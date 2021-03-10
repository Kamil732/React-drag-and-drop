import React, { useState } from 'react'
import uuid from 'uuid/dist/v4'
import main from './assets/css/main.css'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const itemsFromBackend = [
	{
		id: uuid(),
		content: 'First task',
	},
	{
		id: uuid(),
		content: 'Second task',
	},
	{
		id: uuid(),
		content: 'Third task',
	},
	{
		id: uuid(),
		content: 'Forth task',
	},
]

const columnsFrombackend = {
	[uuid()]: {
		name: 'Requested',
		items: itemsFromBackend,
	},
	[uuid()]: {
		name: 'Todo',
		items: [],
	},
	[uuid()]: {
		name: 'In Progress',
		items: [],
	},
	[uuid()]: {
		name: 'Done',
		items: [],
	},
}

const onDragEnd = (result, columns, setColumns) => {
	if (!result.destination) return

	const { source, destination } = result

	if (source.droppableId !== destination.droppableId) {
		const sourceColumn = columns[source.droppableId]
		const destColumn = columns[destination.droppableId]
		const sourceItems = [...sourceColumn.items]
		const destItems = [...destColumn.items]
		const [removed] = sourceItems.splice(source.index, 1)
		destItems.splice(destination.index, 0, removed)

		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: sourceItems,
			},
			[destination.droppableId]: {
				...destColumn,
				items: destItems,
			},
		})
	} else {
		const column = columns[source.droppableId]
		const coppiedItems = [...column.items]
		const [removed] = coppiedItems.splice(source.index, 1)
		coppiedItems.splice(destination.index, 0, removed)

		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				items: coppiedItems,
			},
		})
	}
}

function App() {
	const [columns, setColumns] = useState(columnsFrombackend)

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					height: '100%',
				}}
			>
				<DragDropContext
					onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
				>
					{Object.entries(columns).map(([id, column]) => (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<h2>{column.name}</h2>
							<div style={{ margin: 8 }}>
								<Droppable droppableId={id} key={id}>
									{(provided, snapshot) => (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											style={{
												background: snapshot.isDraggingOver
													? 'lightblue'
													: 'lightgrey',
												padding: 4,
												width: 250,
												minHeight: 500,
											}}
										>
											{column.items.map((item, index) => (
												<Draggable
													key={item.id}
													draggableId={item.id}
													index={index}
												>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={{
																userSelect: 'none',
																padding: 16,
																margin: '0 0 8px 0',
																minHeight: '50px',
																backgroundColor: snapshot.isDragging
																	? '#263B4A'
																	: '#456C86',
																color: '#fff',
																...provided
																	.draggableProps
																	.style,
															}}
														>
															{item.content}
														</div>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</div>
						</div>
					))}
				</DragDropContext>
			</div>
			<button onClick={() => console.log(columns)}>
				CONSOLE LOG DATA
			</button>
		</>
	)
}

export default App
