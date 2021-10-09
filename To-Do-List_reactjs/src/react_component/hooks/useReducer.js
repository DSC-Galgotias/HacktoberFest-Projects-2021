import React, { useReducer } from "react";
import "./style.css";

const reducer = (state, action) => {
	if (action.type === "Increment") {
		state += 1;
	}
	if (state > 0 && action.type === "Decrement") {
		state -= 1;
	}
	return state;
};
const UseReducer = () => {
	const initialData = 24;
	const [state, dispatch] = useReducer(reducer, initialData);
	return (
		<>
			<div className="center_div">
				<p>{state}</p>
				<div class="button2" onClick={() => dispatch({ type: "Increment" })}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Increment
				</div>

				<div class="button2" onClick={() => dispatch({ type: "Decrement" })}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Decrement
				</div>
			</div>
		</>
	);
};

export default UseReducer;
