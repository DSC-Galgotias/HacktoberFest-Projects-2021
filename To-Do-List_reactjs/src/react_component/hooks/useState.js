import React, { useState } from "react";
import "./style.css";

const UseState = () => {
	const initialData = 24;
	const [displayNum, setDisplayNum] = useState(initialData);
	return (
		<>
			<div className="center_div">
				<p>{displayNum}</p>
				<div class="button2" onClick={() => setDisplayNum(displayNum + 1)}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Increment
				</div>

				<div
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
				</div>
			</div>
		</>
	);
};

export default UseState;
