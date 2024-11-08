const { BadRequestError } = require("../utils/error");

module.exports = {
    validatePost: (data, file) => {
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
    },
    validateId: (data) => {
        const { id } = data;

        if (!id) {
            throw new BadRequestError('id is required!');
        } else if (isNaN(id)) {
            throw new BadRequestError('id must be a number type!');
        }

        return true;
    },
    validatePatch: (data, file) => {
        const { title, description } = data;

        if (!title && !description && !file) {
            throw new BadRequestError('No changes occured!');
        } else if (title === '') {
            throw new BadRequestError('Title must not be empty!');
        } else if (title && typeof title !== 'string') {
            throw new BadRequestError('Title must be a string type!')
        } else if (description && typeof description !== 'string') {
            throw new BadRequestError('Description must be a string type!')
        }

        return true;
    },
};