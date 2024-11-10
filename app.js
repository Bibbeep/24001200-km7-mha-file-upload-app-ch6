if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const router = require('./routes/pictureRoute');
const { errorHandler } = require('./utils/errorHandler');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));