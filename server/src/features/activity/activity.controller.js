import prisma from '../../lib/prisma.js';
import { v7 as uuidv7 } from 'uuid';

export const getAllActivities = async (req, res) => {
    const { title, description, childId, fitrahTagIds } = req.body;

    if (!title || !childId || !fitrahTagIds || fitrahTagIds.length === 0) {
        return res.status(400).json({ message: 'Judul dan fitrah kegiatan harus diisi.' });
    }

    try {
        const newActivity = await prisma.activity.create({
            data: {
                id: uuidv7(),
                title,
                description,
                child: {
                    connect: { id: childId }
                },
                fitrahTags: {
                    connect: fitrahTagIds.map((tagId) => ({ id: tagId })),
                },
            },
        });

        return res.status(201).json(newActivity);
    } catch (error) {
        console.error('Pembuatan aktivitas baru gagal:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
