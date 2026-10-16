import readline from 'readline';
import bcrypt from 'bcryptjs';
import { prisma } from '../src/config/db.js';
import { createAdminSchema } from '../src/validators/auth.validator.js';

async function prompt(questionText: string, isPassword = false): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(questionText, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('\n======================================================');
  console.log('👑 AURELIA ATELIER — Secure Administrator Provisioning');
  console.log('======================================================\n');

  try {
    let email = process.env.ADMIN_EMAIL;
    let password = process.env.ADMIN_PASSWORD;
    let fullName = process.env.ADMIN_NAME || 'Atelier Founder';

    if (!email) {
      email = await prompt('Enter administrator email: ');
    }

    if (!password) {
      password = await prompt('Enter administrator password (min 8 chars): ', true);
    }

    if (!fullName || fullName === 'Atelier Founder') {
      const inputName = await prompt('Enter administrator full name (default: Atelier Founder): ');
      if (inputName) fullName = inputName;
    }

    // Validate inputs
    const validated = createAdminSchema.parse({
      email,
      password,
      fullName,
      role: 'ADMIN',
    });

    // Check if user already exists
    const existing = await prisma.adminUser.findUnique({
      where: { email: validated.email },
    });

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(validated.password, salt);

    if (existing) {
      console.log(`\nUser ${validated.email} already exists. Updating password and details...`);
      await prisma.adminUser.update({
        where: { email: validated.email },
        data: {
          fullName: validated.fullName,
          passwordHash,
          role: validated.role,
        },
      });
      console.log('✓ Administrator credentials updated successfully.');
    } else {
      await prisma.adminUser.create({
        data: {
          email: validated.email,
          fullName: validated.fullName,
          passwordHash,
          role: validated.role,
        },
      });
      console.log('✓ New administrator successfully provisioned.');
    }

    console.log(`\nEmail: ${validated.email}`);
    console.log(`Name:  ${validated.fullName}`);
    console.log(`Role:  ${validated.role}`);
    console.log('Status: ACTIVE & SECURED\n');
  } catch (error: any) {
    console.error('\n✗ Administrator provisioning failed:', error.message || error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

