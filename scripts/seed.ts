import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { id: "dev", name: "개발" },
    { id: "react", name: "React" },
    { id: "typescript", name: "TypeScript" },
    { id: "nextjs", name: "Next.js" },
    { id: "web", name: "웹 개발" },
  ]

  console.log("Seeding categories...")

  for (const category of categories) {
    const exists = await prisma.category.findUnique({
      where: { id: category.id },
    })

    if (!exists) {
      await prisma.category.create({
        data: category,
      })
      console.log(`Created category: ${category.name}`)
    } else {
      console.log(`Category already exists: ${category.name}`)
    }
  }

  console.log("Seeding completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 