const express = require('express');
const axios = require('axios');

const app = express();
const port = 5000;

app.get('/', async (req, res) => {
    try {
        res.send(`Well, alright, you're good to go'`);
    } catch (error) {
        res.status(500).send('Error calling Service A');
    }
});

app.listen(port, () => {
    console.log(`Service B running on port ${port}`);
});

