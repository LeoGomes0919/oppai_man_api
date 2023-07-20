import { prisma } from '@/shared/infra/prisma'

async function main() {
  // create genres if not exists
  await prisma.genre.createMany({
    data: [
      { name: 'PVP' },
      { name: 'MOBA' },
      { name: 'FPS' },
      { name: 'RPG' },
      { name: 'MMORPG' },
      { name: 'RTS' },
      { name: 'Battle Royale' },
      { name: 'FPA' },
    ],
    skipDuplicates: true,
  })
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
