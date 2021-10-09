import React, { useState, useEffect } from "react";
import "./style.css";

// Getting Local Storage
const getLocalData = () => {
	const lists = localStorage.getItem("mytodolist");

	if (lists) {
		return JSON.parse(lists);
	} else {
		return [];
	}
};

const Todo = () => {
	const [inputData, setInputData] = useState("");
	const [items, setItems] = useState(getLocalData());
	const [isEditItem, setIsEditItem] = useState("");
	const [toggleButton, setToggleButton] = useState(false);

	//Function for adding Items

	const addItem = () => {
		if (!inputData) {
			alert("Please Fill the Data");
		} else if (inputData && toggleButton) {
			setItems(
				items.map((curElem) => {
					if (curElem.id === isEditItem) {
						return { ...curElem, name: inputData };
					}
					return curElem;
				})
			);
			setInputData([]);
			setIsEditItem(null);
			setToggleButton(false);
		} else {
			const myNewInputData = {
				id: new Date().getTime().toString(),
				name: inputData,
			};
			setItems([...items, myNewInputData]);
			setInputData("");
		}
	};

	//Editing Items
	const editItem = (index) => {
		const item_edited = items.find((curElem) => {
			return curElem.id === index;
		});
		setInputData(item_edited.name);
		setIsEditItem(index);
		setToggleButton(true);
	};

	// Deleting Section

	const deleteItem = (index) => {
		const updatedItems = items.filter((curElem) => {
			return curElem.id !== index;
		});
		setItems(updatedItems);
	};

	//Removing all elements
	const removeAll = () => {
		setItems([]);
	};

	//Adding Local Storage
	useEffect(() => {
		localStorage.setItem("mytodolist", JSON.stringify(items));
	}, [items]);
	return (
		<>
			<div className="main-div">
				<div className="child-div">
					<figure>
						<img src="./images/todo.svg" alt="todologo" />
						<figcaption>Add Your List Here</figcaption>
					</figure>
					<div className="addItems">
						<input
							type="text"
							placeholder="Add Item"
							className="form-control"
							value={inputData}
							onChange={(e) => setInputData(e.target.value)}
						/>
						{toggleButton ? (
							<i className="fa fa-edit add-btn" onClick={addItem}></i>
						) : (
							<i className="fa fa-plus add-btn" onClick={addItem}></i>
						)}
					</div>

					{/* To display/show items */}
					<div className="showItems">
						{items.map((curElem) => {
							return (
								<div className="eachItem" key={curElem.id}>
									<h3>{curElem.name}</h3>
									<div className="todo-btn">
										<i
											className="fas fa-edit add-btn"
											onClick={() => editItem(curElem.id)}
										></i>
										<i
											className="fas fa-trash-alt add-btn"
											onClick={() => deleteItem(curElem.id)}
										></i>
									</div>
								</div>
							);
						})}
					</div>

					<div className="showItems">
						<button
							className="btn effect04"
							data-sm-link-text="Remove All"
							onClick={removeAll}
						>
							<span> CHECK LIST</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Todo;
