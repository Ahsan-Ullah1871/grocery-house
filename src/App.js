import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import Admin from "./Components/Admin/Admin";
import CheckOut from "./Components/CheckOut/CheckOut";

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/home">
						<Home />
					</Route>
					<Route path="/admin">
						<Admin />
					</Route>
					<Route path="/checkOut/:name">
						<CheckOut />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
