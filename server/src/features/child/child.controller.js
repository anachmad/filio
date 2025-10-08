import prisma from "../../lib/prisma.js";

export const createChild = async (req, res) => {
    const { name, dateOfBirth } = req.body;
    const userId = req.user.userId;

    // Memvalidasi input nama dan tanggal lahir
    if(!name || !dateofBirth) {
        return res.status(400).json({
            message: 'Nama atau Tanggal Lahir belum diisi.'
        });
    }

    // Membuat data anak dan data dummy keluarga 
    try {
        let user = await prisma.user.findUnique({
            where: { id: userId }
        });
        let family;

        if(user.familyId) {
            family = await prisma.family.findUnique({
                where: { id: user.familyId }
            });
        } else {
            family = prisma.family.create({
                data: { name: `Keluarga ${user.fullName}`}
            });

            await prisma.user.update({
                where: { id: userId },
                data: { familyId: family.id}
            });
        }

        const newChild = await prisma.child.create({
            data: {
                name,
                dateOfBirth: new Date(dateOfBirth),
                familyId: family.id,
            },
        });

        res.status(201).json({
            message: 'Ananda berhasil didaftarkan.',
            newChild,
        });

    } catch (error){
        console.error(error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};