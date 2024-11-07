const { PrismaClient } = require('@prisma/client');
const imagekit = require('../configs/imagekit');
const path = require('path');
const prisma = new PrismaClient();

module.exports = {
    upload: async ({ originalname, buffer }) => {
        const data = await imagekit.upload({
            fileName: Date.now() + path.extname(originalname),
            file: buffer.toString('base64')
        });

        return {
            fileId: data.fileId,
            url: data.url
        };
    },
    create: async ({ title, description }, fileId, imageUrl) => {
        const data = await prisma.picture.create({
            data: {
                fileId,
                title,
                description,
                imageUrl
            }
        });

        return {
            id: data.id,
            title: data.title
        };
    },
    findAll: async () => {
        const data = await prisma.picture.findMany({
            select: {
                id: true,
                title: true,
                imageUrl: true
            }
        });

        return data;
    },
    findById: async ({ id }) => {
        const data = await prisma.picture.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        return data;
    }
};