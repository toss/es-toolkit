import { doc } from "@deno/doc";
import { groupBy } from "@es-toolkit/es-toolkit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { toDocumentationItem } from "./operations/toDocumentationItem.ts";
import { createDocumentationFile } from "./operations/createDocumentationFile/createDocumentationFile.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  // const modulePaths = {
  //   array: await doc(`file:${path.resolve(__dirname, '..', '..', 'src', 'array', 'index.ts')}`),
  //   array: await doc(`file:${path.resolve(__dirname, '..', '..', 'src', 'array', 'index.ts')}`),
  // };

  const basePath = path.resolve(__dirname, "..", "..", "src");
  const result = await doc(
    `file:${path.join(basePath, "index.ts")}`,
  );

  for (
    const [name, entries] of Object.entries(groupBy(result, (x) => x.name))
  ) {
    if (name.trim() === "") {
      continue;
    }

    const filePath = fileURLToPath(entries[0].location.filename);
    const relativePath = path.relative(basePath, filePath);

    console.log(relativePath);

    // const filePath = path.resolve(__dirname, "..", "..", "src", "index.ts");
    // try {
    //   await Deno.stat(filePath);
    //   console.log(`File exists: ${filePath}`);
    // } catch (error) {
    //   if (error instanceof Deno.errors.NotFound) {
    //     console.log(`File does not exist: ${filePath}`);
    //   } else {
    //     console.error(`Error checking file: ${error}`);
    //   }
    // }

    const item = toDocumentationItem(name, entries);
    // const file = createDocumentationFile(item);

    // console.log(file);
  }
}

run();
