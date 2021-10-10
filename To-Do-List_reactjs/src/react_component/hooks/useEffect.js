import React, { useState, useEffect } from "react";
import "./style.css";

const UseEffect = () => {
	const initialData = 0;
	const [displayNum, setDisplayNum] = useState(initialData);

	// useEffect(() => {
	// 	console.log("hello");
	// }, []); //once I add array dependency, hello doesn't get printed multiple times

	useEffect(() => {
		document.title = `Chats(${displayNum})`;
	}); //the array dependency, stops useEffect Hook if placed "// -> Array Dependency"
	return (
		<>
			<div className="center_div">
				<p>{displayNum}</p>
				<div class="button2" onClick={() => setDisplayNum(displayNum + 1)}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Send Message
				</div>

				{/* <div
					class="button2"
					onClick={() =>
						displayNum > 0 ? setDisplayNum(displayNum - 1) : setDisplayNum(0)
					}
				>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Decrement
				</div> */}
			</div>
		</>
	);
};

export default UseEffect;
