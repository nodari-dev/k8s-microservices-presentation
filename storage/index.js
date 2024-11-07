const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
const SERVICE_NAME = "storage"

const LOGGER = "http://localhost:3000/log"
const ACCESS_RIGHTS = "http://localhost:3001"

const time_now = () => {
	const date = new Date();

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');
	const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

	return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

const log = async (time, method, service_name, endpoint, request_id) => {
	try{
		await axios.post(LOGGER, {time, method, service_name, endpoint, request_id})
	} catch(e){
		console.log(e)
	}
}

const check_access = async (endpoint) => {
	let access = false;
	try {
		const res = axios.get(ACCESS_RIGHTS + endpoint)
		if (res.status == 200) {
			access = true
		}
	} catch (e) {
		console.log("something happened", e)
	}

	return access
}

const gen_req_id = (req) =>{
	return req.headers["X-REQUEST-ID"] ?? uuidv4();
}

app.get('/public', async (req, res) => {
	try {
		await log(time_now, req.method, SERVICE_NAME, "/public", gen_req_id());
		const access_granted = check_access("/public");
		if(access_granted){
			res.send('alright, you can see public data');
		} else{
			res.status(403).send('You will not see public data');
		}
	} catch (error) {
		console.error('Error calling access rights:', error.message);
		res.status(500).send('error calling access rights');
	}
});

app.get('/private', async (req, res) => {
	try {
		await log(time_now, req.method, SERVICE_NAME, "/private", gen_req_id());
		const access_granted = check_access("/private");
		if(access_granted){
			res.send('alright, you can see private data');
		} else{
			res.status(403).send('You will not private data');
		}
	} catch (error) {
		console.error('Error calling access rights:', error.message);
		res.status(500).send('error calling access rights');
	}
});

app.listen(PORT, () => {
	console.log(`Storage running on http://localhost:${PORT}`);
});

