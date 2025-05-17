import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Link,
	Routes,
	Outlet,
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import StockGroupComponent from './StockGroupComponent'
import StrategyComponent from "./StrategyComponent";

const stocks = ['ITC', 'INFY', 'TCS']

function Home() {
    return (
		<>
            {
                stocks.map((stock) => {
                    return (
                        <div key={stock}>
                            <h2>{stock}</h2>
                            <p>Details about {stock}</p>
                        </div>
                    )
                })
            }

			<div className="container mt-4">
				<Routes>
					<Route path="/" element={<Outlet />}>
					</Route>
				</Routes>
			</div>
		</>
	);
}

export default Home;