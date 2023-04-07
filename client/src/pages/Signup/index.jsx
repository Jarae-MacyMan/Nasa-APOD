import { Link,useNavigate } from "react-router-dom";
import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {signup} from "../../redux/actions/auth";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';



function Signup() {
	const nagivate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
		username: '',
		email: '',
		password: '',
	})

	const { username, email, password } = inputs;

	console.log(username, email, password);

    const onChange = (e) => {setInputs({ ...inputs, [e.target.name]: e.target.value})};

	const onSubmitForm = async (e) => {

        e.preventDefault();

            try {
				const body = { username, email, password };
				const response = await fetch("http://localhost:8080/users/signup", {
				  method: "POST",
				  headers: { "Content-Type": "application/json" },
				  body: JSON.stringify(body),
				});
				const parseRes = await response.json();

				console.log(parseRes)
				
			  } catch (error) {
				console.error(error.message);
			  }
    }

	const googleAuth = () => {
		window.open(
			`http://localhost:8080/auth/google/callback`,
			"_self"
		);
	};

	

	return (
		<div >
			<AppBar position="fixed">
            <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Welcome!
            </Typography>

            </Toolbar>

          </AppBar>

			<Card variant="outlined" sx={{ mt:16, pt:5, mx:50}} >

			<Grid >

				<Grid sx={{ ml:17, pb:2}} >
					<h1 >Sign up Form</h1>
				</Grid>

			
		

				<Grid sx={{ ml:6}}  >

					<label className="px-2">
					<h3 >Username:</h3>
					</label>
					<input
					onChange={(e) => onChange(e)}
					value={username}
					type="text"
					name="username"
					class="mb-4"
					placeholder="Enter a username"
					/>
				</Grid>


				<Grid sx={{ ml:6}}  >
					<label className="px-2">
					<h3 >Email Address:</h3>
					</label>
					<input
					onChange={(e) => onChange(e)}
					value={email}
					type="email"
					name="email"
					class="mb-4"
					placeholder="Enter email address"
					/>
				</Grid>

				<Grid sx={{ ml:6}}  >

			  <form onSubmit={onSubmitForm} >
                <label className="px-2">
                  <h3 >Password:</h3>
                </label>
                <input
                  onChange={(e) => onChange(e)}
                  value={password}
                  name="password"
                  placeholder="Enter password"
                /> 




                  <Button sx={{ ml:20, mt:3}} variant="contained" type="submit"> Sign UP</Button>

              </form> 
			  </Grid>

			  <Grid sx={{ ml:28, mt:2}}  >
					<h3>or</h3>
				</Grid>

					<Button  sx={{ ml:19, mt:3}}  variant="contained" onClick={googleAuth}>
						<span>Sing up with Google</span>
					</Button>
					<Typography sx={{ ml:17, py:3}}>
						Already Have Account? <Link to="/login">Log In</Link>
					</Typography>
			

			</Grid>
			</Card>
		</div>
	);
}

export default Signup;
