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
import SymbolInfoComponent from "./SymbolInfoComponent";
import SymbolDetailsComponent from "./SymbolDetailsComponent";
import Stock from "./Stock";

function TAHelperHome() {
	return (
		<div>
			<h2>Techincal Analysis Home Page</h2>
			<p>Welcome to the TA Helper Home Page.</p>
		</div>
	);
}
function TAHelperAbout() {
	return (
		<div>
			<h2>Techincal Analysis Helper About Page</h2>
			<p>Learn more about stock techincal analysis and various strategy backtest result.</p>
		</div>
	);
}
function Sma() {
	return (
		<div>
			<h2>Simple Moving Average</h2>
			<p>Learn more about Simple Moving Average.</p>
		</div>
	);
}

function Groups() {
	return (
		<StockGroupComponent />
	);
}
function NotFound() {
	return (
		<div>
			<h2>404 Not Found</h2>
			<p>Sorry, the page you are looking for does not exist.</p>
		</div>
	);
}

function TaNavBar() {
    return (
		<Router>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
					<Navbar.Brand as={Link} to="/">TA Helper</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/stocks">
							Stocks
						</Nav.Link>
						<Nav.Link as={Link} to="/symbols">
							Symbols
						</Nav.Link>
						<NavDropdown title="Resources">
							<NavDropdown.Item as={Link} to="/strategies">
								Strategies
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/groups">
								Stock Groups
							</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link as={Link} to="/sma">
							SMA
						</Nav.Link>
						<Nav.Link as={Link} to="/about">
							About
						</Nav.Link>
                </Nav>
                </Container>
            </Navbar>

			<div className="container mt-4">
				<Routes>
					<Route path="/" element={<Outlet />}>
						<Route index element={<TAHelperHome />} />
						<Route path="/stocks" element={<Stock />} />
						<Route path="/symbols" element={<SymbolInfoComponent />} />
						<Route path="/sma" element={<Sma />} />
						<Route path="/strategies" element={<StrategyComponent />} />
						<Route path="/groups" element={<Groups />} />
						<Route path="/symbols/:symbol" element={<SymbolDetailsComponent />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</div>
		</Router>
	);
}

export default TaNavBar;