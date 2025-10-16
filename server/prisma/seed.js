import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const FITRAH_CATEGORIES = [
    { id: 'iman', name: 'Keimanan' },
    { id: 'belajar', name: 'Belajar'},
    { id: 'bakat', name: 'Bakat'},
    { id: 'seksualitas', name: 'Seksualitas' },
    { id: 'estetika', name: 'Estetika & Bahasa' },
    { id: 'sosialitas', name: 'Individualitas & Sosialitas' },
    { id: 'jasmani', name: 'Jasmani '},
    { id: 'perkembangan', name: 'Perkembangan'},
];

async function main() {
    console.log('Seeding database...');

    for (const fitrah of FITRAH_CATEGORIES) {
        const createdFitrah = await prisma.fitrahTag.upsert({
            where: { id: fitrah.id },
            update: {},
            create: {
                id: fitrah.id,
                name: fitrah.name,
            },
        });
        
        console.log(`Created or updated fitrah tag: ${createdFitrah.name}`);
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
