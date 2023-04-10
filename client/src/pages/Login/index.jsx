import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../context/context";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import {useDispatch} from 'react-redux';
//import {signin} from "../../redux/actions/auth";
import Stack from '@mui/material/Stack';




const axios = require('axios')

function Login() {
	const context = useContext(Context);


	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	})
	// const [email,setEmail] = useState("");
    // const [password,setPassword] = useState("");

	const googleAuth = () => {
		window.open(
			`https://nasa-apod-apis.vercel.app/auth/google/callback`,
			"_self"
		);
	};

	const navigate = useNavigate ()
    const dispatch = useDispatch()

	const { email, password } = inputs;

	console.log( email, password);

    const onChange = (e) => {setInputs({ ...inputs, [e.target.name]: e.target.value})};

	const onSubmitForm = async (e) => {

        e.preventDefault();

            try {
				const body = { email, password };

				headers.append('Content-Type', 'application/json');
				headers.append('Accept', 'application/json');
				headers.append('Origin','https://nasa-apod-rho.vercel.app');

				const response = await fetch("https://nasa-apod-apis.vercel.app/users/signin", {
					mode: 'cors',
					credentials: 'include',
					method: "POST",
					headers: headers,
					body: JSON.stringify(body),
				});
				const parseRes = await response.json();

				console.log(parseRes)
				context.setUser(parseRes);

				
			  } catch (error) {
				console.error(error.message);
			  }
    }

	
	return (
		<div  >
			<AppBar position="fixed">
            <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Welcome!
            </Typography>

            </Toolbar>

          </AppBar>

		  <div className="mx-auto">
			<Card variant="outlined" sx={{ mt:16, pt:5, mx:50}} >
				
			<Grid >
				<Grid sx={{ ml:17, pb:2}} >
					<h1 >Log in Form</h1>
				</Grid>

					
				<Grid sx={{ ml:6}}  >
				<label className = "px-2">
                  <h3 >Email Address:</h3>
                </label>
					<input
						onChange={(e) => onChange(e)}
						value={email}
						type="email"
						name="email"
						className ="mb-4"
						placeholder="Enter email address"
					/> 
				</Grid>

				<Grid sx={{ ml:6}}  >
				<form onSubmit={onSubmitForm} >
                  <label className = "px-2">
                    <h3 >Password: </h3>
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    value={password}
                    className = "p"
                    name="password"
                    placeholder="Enter password"
                  />
				  
                    <Button sx={{ ml:20, mt:3}} variant="contained" type="submit"> Login</Button>
                </form>
				</Grid>

				<Grid sx={{ ml:28, mt:2}}  >
					<h3>or</h3>
				</Grid>

					<Button  sx={{ ml:20, mt:3}} variant="contained" onClick={googleAuth}>
						<span>Sign in with Google</span>
					</Button>

					<Typography sx={{ ml:23, py:3}}>
						New Here? <Link to="/signup">sign Up</Link>
					</Typography>

					

			
			</Grid>
			</Card>
			</div>
		</div>
	);
}

export default Login;
