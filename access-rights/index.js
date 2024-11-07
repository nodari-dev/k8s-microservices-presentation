const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;
const SERVICE_NAME = "access-rights"

const LOGGER = "http://localhost:3000/log"

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

const gen_req_id = (req) =>{
	return req.headers["X-REQUEST-ID"] ?? uuidv4();
}

app.get('/public', async (req, res) => {
	try {
		await log(time_now, req.method, SERVICE_NAME, "/public", gen_req_id());
		res.status(200);
	} catch (error) {
		res.status(500).send('something went wrong', e);
	}
});

app.get('/public', async (req, res) => {
	try {
		await log(time_now, req.method, SERVICE_NAME, "/public", gen_req_id());
		res.status(200);
	} catch (error) {
		res.status(500).send('something went wrong', e);
	}
});

app.listen(PORT, () => {
	console.log(`Access rights running on http://localhost:${PORT}`);
});

