const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;

app.get('/', (req, res) => {
    res.send('Binar Challenge Chapter 6');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));