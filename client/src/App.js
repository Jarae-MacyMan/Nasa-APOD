import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Context from "./context/context";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
	const context = useContext(Context);
	//console.log(context.user)

	//const [user, setUser] = useState(null);
	

	const getUser = async () => {
		try {
			const url = `http://localhost:8080/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
				context.setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};
	//https://nasa-apod-apis.vercel.app/
	//http://localhost:8080/

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="container">
			<Routes>
				<Route
					exact
					path="/"
					element={context.user ? <Home user={context.user} /> : <Navigate to="/login" />}
				/>
				<Route
					exact
					path="/login"
					element={context.user ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/signup"
					element={context.user ? <Navigate to="/" /> : <Signup />}
				/>
			</Routes>
		</div>
	);
}

export default App;
