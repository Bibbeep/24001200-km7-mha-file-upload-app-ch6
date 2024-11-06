const { BadRequestError } = require("../utils/error");

module.exports = {
    validate: (data) => {
        const { title, description } = data;

        if (!title || !description) {
            throw new BadRequestError('Title and description are required!');
        }

        if (typeof title !== 'string' || typeof description !== 'string') {
            throw new BadRequestError('TItle and description must be string type!');
        }

        return true;
    }
};