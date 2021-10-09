import React, { useState } from "react";
import "./style.css";
import Items from "./hotelapi";
import Hotelcard from "./hotelcard";
import Navbar from "./navbar";

const uniqueList = [
	...new Set( //Set function is used to remove duplicate elements
		Items.map((curElem) => {
			return curElem.category;
		})
	),
	"All",
]; //spread operator : ... (for converting into Array)

console.log(uniqueList);

const Hotel = () => {
	// Hooks should always be at Top
	const [menuData, setMenuData] = useState(Items);
	const [menuList, setMenuList] = useState(uniqueList);

	const filterItem = (category) => {
		if (category === "All") {
			setMenuData(Items);
			return;
		}

		const updatedList = Items.filter((curElem) => {
			return curElem.category === category;
		});
		setMenuData(updatedList);
	};
	// console.log(menuData);

	return (
		<>
			<Navbar filterItem={filterItem} menuList={menuList} />
			<Hotelcard menuData={menuData} />
			{/* Props */}
		</>
	);
};

export default Hotel;
