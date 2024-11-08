const { PrismaClient } = require('@prisma/client');
const imagekit = require('../configs/imagekit');
const path = require('path');
const prisma = new PrismaClient();

module.exports = {
    uploadImgKit: async ({ originalname, buffer }) => {
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
            },
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                imageUrl: true
            }
        });

        return data;
    },
    deleteById: async ({ id }) => {
        const fileId = await prisma.picture.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                fileId: true
            }
        });

        if (!fileId) {
            return false;
        }

        await prisma.picture.delete({
            where: {
                id: parseInt(id)
            }
        });

        return fileId;
    },
    deleteImgKit: async (fileId) => {
        await imagekit.deleteFile(fileId);
    },
    editById: async ({ id }, { title, description }, { fileId, url: imageUrl }) => {
        const existingData = await prisma.picture.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!existingData) {
            return false;
        }

        if (title) {
            await prisma.picture.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title
                }
            });
        }

        if (description) {
            await prisma.picture.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    description
                }
            });
        }

        if (imageUrl && fileId) {
            await prisma.picture.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    imageUrl,
                    fileId
                }
            });

            await imagekit.deleteFile(existingData.fileId);
        }

        const data = await prisma.picture.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                imageUrl: true
            }
        });

        return data;
    },
};