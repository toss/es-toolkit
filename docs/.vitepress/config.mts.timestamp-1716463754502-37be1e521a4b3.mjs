var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// .vitepress/config.mts
import { defineConfig } from "file:///Users/raon0211/dev/js-utils/.yarn/__virtual__/vitepress-virtual-322d676ffc/3/.yarn/berry/cache/vitepress-npm-1.2.2-86d03ab7f3-10c0.zip/node_modules/vitepress/dist/node/index.js";
var config_default = defineConfig({
  title: "es-toolkit",
  description: "A state-of-the-art, high-performance JavaScript utility library featuring robust type annotations and straightforward implementations.",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Introduction", link: "/intro" },
      { text: "Reference", link: "/reference/array/chunk" }
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/intro" },
          { text: "Installation", link: "/installation" }
        ]
      },
      {
        text: "Reference",
        items: [
          {
            text: "Array Utilities",
            items: [
              { text: "chunk", link: "/reference/array/chunk" },
              { text: "difference", link: "/reference/array/difference" },
              { text: "differenceBy", link: "/reference/array/differenceBy" },
              { text: "differenceWith", link: "/reference/array/differenceWith" }
            ]
          },
          {
            text: "Predicates",
            items: [
              { text: "isNil", link: "/reference/predicate/isNil" }
            ]
          }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/toss/es-toolkit" }
    ]
  },
  vite: {
    resolve: {
      alias: {
        "vue/server-renderer": __require.resolve("vue/server-renderer", {
          paths: [__require.resolve("vitepress")]
        })
      }
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3Jhb24wMjExL2Rldi9qcy11dGlscy9kb2NzLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9yYW9uMDIxMS9kZXYvanMtdXRpbHMvZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3Jhb24wMjExL2Rldi9qcy11dGlscy9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcblxuLy8gaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9zaXRlLWNvbmZpZ1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgdGl0bGU6IFwiZXMtdG9vbGtpdFwiLFxuICBkZXNjcmlwdGlvbjogXCJBIHN0YXRlLW9mLXRoZS1hcnQsIGhpZ2gtcGVyZm9ybWFuY2UgSmF2YVNjcmlwdCB1dGlsaXR5IGxpYnJhcnkgZmVhdHVyaW5nIHJvYnVzdCB0eXBlIGFubm90YXRpb25zIGFuZCBzdHJhaWdodGZvcndhcmQgaW1wbGVtZW50YXRpb25zLlwiLFxuICB0aGVtZUNvbmZpZzoge1xuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiAnSG9tZScsIGxpbms6ICcvJyB9LFxuICAgICAgeyB0ZXh0OiAnSW50cm9kdWN0aW9uJywgbGluazogJy9pbnRybycgfSxcbiAgICAgIHsgdGV4dDogJ1JlZmVyZW5jZScsIGxpbms6ICcvcmVmZXJlbmNlL2FycmF5L2NodW5rJyB9LFxuICAgIF0sXG5cbiAgICBzaWRlYmFyOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdHdWlkZScsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnSW50cm9kdWN0aW9uJywgbGluazogJy9pbnRybycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdJbnN0YWxsYXRpb24nLCBsaW5rOiAnL2luc3RhbGxhdGlvbicgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnUmVmZXJlbmNlJyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQXJyYXkgVXRpbGl0aWVzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ2NodW5rJywgbGluazogJy9yZWZlcmVuY2UvYXJyYXkvY2h1bmsnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ2RpZmZlcmVuY2UnLCBsaW5rOiAnL3JlZmVyZW5jZS9hcnJheS9kaWZmZXJlbmNlJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdkaWZmZXJlbmNlQnknLCBsaW5rOiAnL3JlZmVyZW5jZS9hcnJheS9kaWZmZXJlbmNlQnknIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ2RpZmZlcmVuY2VXaXRoJywgbGluazogJy9yZWZlcmVuY2UvYXJyYXkvZGlmZmVyZW5jZVdpdGgnIH0sXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnUHJlZGljYXRlcycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdpc05pbCcsIGxpbms6ICcvcmVmZXJlbmNlL3ByZWRpY2F0ZS9pc05pbCcgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdLFxuXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdG9zcy9lcy10b29sa2l0JyB9XG4gICAgXVxuICB9LFxuICB2aXRlOiB7XG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ3Z1ZS9zZXJ2ZXItcmVuZGVyZXInOiByZXF1aXJlLnJlc29sdmUoJ3Z1ZS9zZXJ2ZXItcmVuZGVyZXInLCB7XG4gICAgICAgICAgcGF0aHM6IFtyZXF1aXJlLnJlc29sdmUoJ3ZpdGVwcmVzcycpXSxcbiAgICAgICAgfSksXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQThTLFNBQVMsb0JBQW9CO0FBRzNVLElBQU8saUJBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxJQUNYLEtBQUs7QUFBQSxNQUNILEVBQUUsTUFBTSxRQUFRLE1BQU0sSUFBSTtBQUFBLE1BQzFCLEVBQUUsTUFBTSxnQkFBZ0IsTUFBTSxTQUFTO0FBQUEsTUFDdkMsRUFBRSxNQUFNLGFBQWEsTUFBTSx5QkFBeUI7QUFBQSxJQUN0RDtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1A7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNMLEVBQUUsTUFBTSxnQkFBZ0IsTUFBTSxTQUFTO0FBQUEsVUFDdkMsRUFBRSxNQUFNLGdCQUFnQixNQUFNLGdCQUFnQjtBQUFBLFFBQ2hEO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0sU0FBUyxNQUFNLHlCQUF5QjtBQUFBLGNBQ2hELEVBQUUsTUFBTSxjQUFjLE1BQU0sOEJBQThCO0FBQUEsY0FDMUQsRUFBRSxNQUFNLGdCQUFnQixNQUFNLGdDQUFnQztBQUFBLGNBQzlELEVBQUUsTUFBTSxrQkFBa0IsTUFBTSxrQ0FBa0M7QUFBQSxZQUNwRTtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0sU0FBUyxNQUFNLDZCQUE2QjtBQUFBLFlBQ3REO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsYUFBYTtBQUFBLE1BQ1gsRUFBRSxNQUFNLFVBQVUsTUFBTSxxQ0FBcUM7QUFBQSxJQUMvRDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLHVCQUF1QixVQUFRLFFBQVEsdUJBQXVCO0FBQUEsVUFDNUQsT0FBTyxDQUFDLFVBQVEsUUFBUSxXQUFXLENBQUM7QUFBQSxRQUN0QyxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
