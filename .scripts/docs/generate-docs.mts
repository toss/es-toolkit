import { doc } from "@deno/doc";
import { groupBy } from "@es-toolkit/es-toolkit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createDocumentationFile } from "./operations/create-documentation-file.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const result = await doc(
    `file:${path.resolve(__dirname, "..", "..", "src", "index.ts")}`,
  );

  for (
    const [name, entries] of Object.entries(groupBy(result, (x) => x.name))
  ) {
    if (name.trim() === "") {
      continue;
    }

    console.log(entries);

    createDocumentationFile(name, entries);
  }
}

run();
