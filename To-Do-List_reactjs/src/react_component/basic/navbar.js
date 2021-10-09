import React from "react";

const Navbar = ({ filterItem, menuList }) => {
	return (
		<>
			<nav className="navbar">
				<div className="btn-group">
					{menuList.map((curElem) => {
						return (
							<button
								className="btn-group__item"
								onClick={() => filterItem(curElem)}
							>
								{curElem}
							</button>
						);
					})}

					{/* <button
						className="btn-group__item"
						onClick={() => setMenuData(Items)}
					>
						All
					</button> */}
				</div>
			</nav>
		</>
	);
};

export default Navbar;
