const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Add a contact example
  await prisma.contact.create({
    data: {
      name: 'Seed Contact',
      email: 'seed@example.com',
      subject: 'Hello from seed',
      message: 'This is a seeded contact message',
      budget: 'N/A',
      timeline: 'ASAP',
    },
  });

  // Add a newsletter subscriber
  await prisma.newsletterSubscriber.create({
    data: {
      email: 'subscriber@example.com',
      name: 'Subscriber One',
      interests: ['web', 'design'],
    },
  });

  // Add a sample project
  await prisma.project.create({
    data: {
      title: 'Seed Project',
      slug: 'seed-project',
      description: 'A sample seeded project',
      content: 'Details for seeded project',
      tags: ['seed', 'example'],
      category: 'sample',
      featured: false,
    },
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
