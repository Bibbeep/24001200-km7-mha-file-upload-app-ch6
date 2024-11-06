const { BadRequestError } = require("../utils/error");

module.exports = {
    validate: (data, file) => {
        const { title, description } = data;
        
        if (!file) {
            throw new BadRequestError('Image file is required!');
        } else if ((title && description) && (typeof title !== 'string' && typeof description !== 'string')) {
            throw new BadRequestError('Title and description must be string type!');
        } else if (description && typeof description !== 'string') {
            throw new BadRequestError('Description must be string type!');
        } else if (!title) {
            throw new BadRequestError('Title is required!');
        } else if (typeof title !== 'string') {
            throw new BadRequestError('Title must be a string type!');
        }

        return true;
    }
};