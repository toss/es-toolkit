import { lstat, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultSkillsDirectory = fileURLToPath(new URL('../es-toolkit-plugin/skills/', import.meta.url));
const skillsDirectory = path.resolve(process.argv[2] ?? defaultSkillsDirectory);
const errors = [];

async function checkTree(currentPath, skillDirectory) {
  const stat = await lstat(currentPath);
  const relativePath = path.relative(skillsDirectory, currentPath);

  if (stat.isSymbolicLink()) {
    errors.push(`${relativePath}: symbolic links are not portable when a skill is installed on its own`);
    return;
  }

  if (!stat.isDirectory()) {
    return;
  }

  const entries = await readdir(currentPath);
  for (const entry of entries) {
    await checkTree(path.join(currentPath, entry), skillDirectory);
  }

  if (currentPath === skillDirectory && !entries.includes('SKILL.md')) {
    errors.push(`${relativePath}: missing SKILL.md`);
  }
}

const skillEntries = await readdir(skillsDirectory, { withFileTypes: true });

for (const entry of skillEntries) {
  if (!entry.isDirectory()) {
    errors.push(`${entry.name}: expected each entry under skills/ to be a directory`);
    continue;
  }

  const skillDirectory = path.join(skillsDirectory, entry.name);
  await checkTree(skillDirectory, skillDirectory);
}

if (errors.length > 0) {
  console.error(`Found ${errors.length} non-portable plugin skill path(s):`);
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Verified ${skillEntries.length} standalone plugin skill directories.`);
