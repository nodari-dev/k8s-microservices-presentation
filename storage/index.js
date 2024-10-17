const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://access-rights:5000/');
        res.send(`Service B received: ${response.data}`);
    } catch (error) {
        res.status(500).send('Error calling Service A');
    }
});

app.listen(port, () => {
    console.log(`Service B running on port ${port}`);
});

