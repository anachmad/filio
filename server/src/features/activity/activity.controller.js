import prisma from '../../lib/prisma.js';
import { v7 as uuidv7 } from 'uuid';

export const createActivity = async (req, res) => {
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

export const getActivitiesByChildId = async (req, res) => {
    const { childId } = req.params;

    if (!childId) {
        return res.status(400).json({ message: 'Child ID is required.' });
    }

    try {
        const activities = await prisma.activity.findMany({
            where: { childId },
            include: {
                fitrahTags: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: { activityDate: 'desc' },
        });

        return res.status(200).json(activities);
    } catch (error) {
        console.error('Pengambilan aktivitas gagal:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
