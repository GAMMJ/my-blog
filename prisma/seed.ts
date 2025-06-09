import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: '개발' },
    { name: 'React' },
    { name: 'Next.js' },
    { name: 'TypeScript' },
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: '알고리즘' },
    { name: '프로젝트' },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: { name: category.name },
    })
  }

  console.log('Seed data created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 