import { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Context from "../../context/context";






const axios = require('axios')




function Home(userDetails) {

	const context = useContext(Context);

	const user = userDetails.user;
	const [nasaData, setNasaData] = useState({})

	const logout = () => {
		window.open(`https://nasa-apod-apis.vercel.app/auth/logout`, "_self");
	};

	const picOfDay = async () => {

		//e.preventDefault();

		const API_KEY = "DPYKShDqOt0azgbgT3qogu4s4GMb1Tx3NMatW8gZ";

		const {data: imageData} = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)

		//console.log(imageData)
		setNasaData(imageData) 

	}

	useEffect(() => {
		picOfDay();
	}, []);


	//console.log(user.result.username)

	return (
		<div >

			<AppBar position="fixed">
            <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Hello {user.name ? user.name : user.result.username }
            </Typography>

			<Button sx={{ml:140}} variant="contained" color="secondary" onClick={logout}>
						Log Out
					</Button>

            </Toolbar>

          </AppBar>

			<div >
				
				<Box sx={{py:3}}>
					<h2 >Profile</h2>
					<img
						src={user.picture}
						alt="profile"
						
					/>
				</Box>
					
					<p>{nasaData.explanation}</p>
				

				<div>
						<img width="300" height="100"  src={nasaData.url} className="img-fluid" />
					</div>
			</div>
		</div>
	);
}

export default Home;
