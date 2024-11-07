const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.post('/log', async (req, res) => {
	try {
		console.log(req.body)
		res.status(200).send();
	} catch (error) {
		res.status(500).send('something went wrong', e);
	}
});

app.listen(PORT, () => {
	console.log(`Central logger running on http://localhost:${PORT}`);
});

