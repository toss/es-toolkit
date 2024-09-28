import "@std/dotenv/load";

import { doc, DocNode } from "@deno/doc";
import { differenceWith, groupBy } from "@es-toolkit/es-toolkit";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { toDocumentationItem } from "./operations/toDocumentationItem.ts";
import { render as renderEN } from "./operations/render/en.ts";
import { render as renderKO } from "./operations/render/ko.ts";
import { render as renderZH } from "./operations/render/zh_hans.ts";
import { render as renderJA } from "./operations/render/ja.ts";
import { translate } from "./operations/translate.ts";
import { DocumentationItem } from "./types/DocumentationItem.ts";
import { Locale } from "./types/Locale.ts";
import { RenderOptions } from "./operations/render/types.ts";

// eslint-disable-next-line
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const basePath = path.resolve(__dirname, "..", "..", "src");

const openAiApiKey = Deno.env.get("OPENAI_API_KEY")!;

if (openAiApiKey == null) {
  throw new Error(`OPENAI_API_KEY is not provided.`);
}

type DocumentationItems = Array<{ docPath: string; item: DocumentationItem }>;
type DocumentationPaths = Record<Locale, string>;

async function run() {
  const docsRoot = path.resolve(__dirname, "..", "..", "docs");

  const docsPaths: DocumentationPaths = {
    en: path.join(docsRoot, "reference"),
    ko: path.join(docsRoot, "ko", "reference"),
    ja: path.join(docsRoot, "ja", "reference"),
    zh_hans: path.join(docsRoot, "zh_hans", "reference"),
  };

  const items = toDocumentationItems(
    await doc(`file:${path.join(basePath, "index.ts")}`),
  );

  await renderDocs(docsPaths, items);

  const compatItems = differenceWith(
    toDocumentationItems(
      await doc(`file:${path.join(basePath, "compat", "index.ts")}`),
    ),
    items,
    (x, y) => x.item.name === y.item.name,
  );

  await renderDocs(docsPaths, compatItems, { compat: true });
}

async function renderDocs(
  docsPaths: DocumentationPaths,
  items: DocumentationItems,
  options: RenderOptions = {},
) {
  for (const { docPath, item } of items) {
    console.log(`> Doc: ${docPath}`);

    const enPath = path.join(docsPaths.en, docPath);

    if (!await exists(enPath)) {
      console.log(`> Generating English docs for for: ${docPath}`);
      await Deno.mkdir(path.dirname(enPath), { recursive: true });
      await Deno.writeTextFile(enPath, renderEN(item, options));
    }

    const koPath = path.join(docsPaths.ko, docPath);

    if (!await exists(koPath)) {
      console.log(`> Generating Korean docs for for: ${docPath}`);
      const translated = await translate(item, "ko", { openAiApiKey });
      await Deno.mkdir(path.dirname(koPath), { recursive: true });
      await Deno.writeTextFile(koPath, renderKO(translated, options));
    }

    const jaPath = path.join(docsPaths.ja, docPath);

    if (!await exists(jaPath)) {
      console.log(`> Generating Japanese docs for for: ${docPath}`);
      const translated = await translate(item, "ja", { openAiApiKey });
      await Deno.mkdir(path.dirname(jaPath), { recursive: true });
      await Deno.writeTextFile(jaPath, renderJA(translated, options));
    }

    const zhPath = path.join(docsPaths.zh_hans, docPath);

    if (!await exists(zhPath)) {
      console.log(`> Generating Simplified Chinese docs for for: ${docPath}`);
      const translated = await translate(item, "zh_hans", { openAiApiKey });
      await Deno.mkdir(path.dirname(zhPath), { recursive: true });
      await Deno.writeTextFile(zhPath, renderZH(translated, options));
    }
  }
}

async function exists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error; // rethrow other errors
  }
}

function toDocumentationItems(docs: DocNode[]): DocumentationItems {
  const entries = Object.entries(groupBy(docs, (x) => x.name));

  return entries
    .filter(([name, entries]) => {
      if (name === "") {
        return false;
      }

      if (entries.some((x) => x.kind !== "class" && x.kind !== "function")) {
        return false;
      }

      return true;
    })
    .map(([name, entries]) => {
      const sourcePath = fileURLToPath(entries[0].location.filename);
      const docPath: string = path.relative(basePath, sourcePath).replace(
        /.ts$/g,
        ".md",
      );

      return {
        docPath: docPath,
        item: toDocumentationItem(name, entries),
      };
    });
}

run();
