import { DefaultTheme } from "vitepress";
import path from "node:path";
import glob from "fast-glob";

export function getSidebarItems(
  docsRoot: string,
  ...parts: string[]
): DefaultTheme.SidebarItem[] {
  const files = glob.sync(path.join(docsRoot, ...parts, "*"));
  const paths = files.map((x) => `/${path.relative(docsRoot, x)}`);

  return paths.map((p) => {
    const filename = path.basename(p).replace(/\.md$/g, "");

    return {
      text: filename,
      link: p.replace(/\.md$/g, ""),
    };
  });
}

getSidebarItems.compat = function (docsRoot: string, ...paths: string[]) {
  return getSidebarItems(docsRoot, ...paths).map((item) => {
    return {
      ...item,
      text: `${item.text} (compat)`,
    };
  });
};
