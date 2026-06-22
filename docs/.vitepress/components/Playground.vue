<template>
  <div class="playground">
    <div class="playground-sidebar">
      <div class="playground-search">
        <input v-model="searchQuery" type="text" :placeholder="t.searchPlaceholder" class="playground-search-input" />
      </div>
      <div class="playground-categories">
        <div v-for="category in filteredCategories" :key="category.name" class="playground-category">
          <button class="playground-category-title" @click="toggleCategory(category.name)">
            <span class="playground-category-arrow" :class="{ open: openCategories.has(category.name) }">&#9654;</span>
            {{ category.label }}
          </button>
          <ul v-show="searchQuery || openCategories.has(category.name)" class="playground-function-list">
            <li
              v-for="fn in category.functions"
              :key="fn"
              class="playground-function-item"
              :class="{ active: selectedCategory === category.name && selectedFunction === fn }"
              role="button"
              tabindex="0"
              @click="selectFunction(category, fn)"
              @keydown.enter="selectFunction(category, fn)"
              @keydown.space.prevent="selectFunction(category, fn)"
            >
              {{ fn }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="playground-editor">
      <div class="playground-editor-header">
        <a v-if="selectedFunction && docUrl" :href="docUrl" class="playground-editor-title playground-editor-title-link"
          >{{ selectedCategoryLabel }}/{{ selectedFunction }}</a
        >
        <span v-else class="playground-editor-title">{{ t.selectFunction }}</span>
        <div class="playground-header-actions">
          <button
            v-if="currentDoc"
            class="playground-doc-toggle"
            :class="{ active: showDoc }"
            @click="showDoc = !showDoc"
            :title="t.toggleDoc"
          >
            &#9432;
          </button>
          <button class="playground-reset-btn" @click="resetCode" :title="t.reset">&#8635;</button>
        </div>
      </div>
      <div v-if="currentDoc && showDoc" class="playground-doc-panel">
        <p class="playground-doc-desc" v-html="renderInlineMarkdown(currentDoc.description)"></p>
        <div v-if="currentDoc.params.length" class="playground-doc-section">
          <h4>{{ t.parameters }}</h4>
          <ul>
            <li v-for="p in currentDoc.params" :key="p.name">
              <code>{{ p.name }}</code> <span class="playground-doc-type">({{ p.type }})</span> —
              <span v-html="renderInlineMarkdown(p.description)"></span>
            </li>
          </ul>
        </div>
        <div v-if="currentDoc.returns" class="playground-doc-section">
          <h4>{{ t.returns }}</h4>
          <p>
            <span class="playground-doc-type">({{ currentDoc.returns.type }})</span> —
            <span v-html="renderInlineMarkdown(currentDoc.returns.description)"></span>
          </p>
        </div>
      </div>
      <div class="playground-sandpack">
        <Sandpack
          :key="sandpackKey"
          template="vanilla-ts"
          :light-theme="lightTheme"
          :dark-theme="darkTheme"
          :options="{
            showLineNumbers: true,
            showConsole: true,
            showTabs: false,
            showConsoleButton: true,
            autorun: true,
          }"
          :customSetup="{
            deps: {
              'es-toolkit': 'latest',
            },
          }"
          :files="sandpackFiles"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress';
import { Sandbox as Sandpack } from 'vitepress-plugin-sandpack';
import { computed, ref } from 'vue';
import { data as playgroundData } from '../data/playground.data.mts';

const lightTheme = 'light';
const darkTheme = 'dark';

const { lang } = useData();

function renderInlineMarkdown(text) {
  if (!text) {
    return '';
  }
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

const translations = {
  en: {
    searchPlaceholder: 'Search functions...',
    selectFunction: 'Select a function to start',
    reset: 'Reset code',
    toggleDoc: 'Toggle documentation',
    parameters: 'Parameters',
    returns: 'Returns',
  },
  ko: {
    searchPlaceholder: '함수 검색...',
    selectFunction: '함수를 선택하세요',
    reset: '코드 초기화',
    toggleDoc: '문서 보기',
    parameters: '파라미터',
    returns: '반환 값',
  },
  ja: {
    searchPlaceholder: '関数を検索...',
    selectFunction: '関数を選択してください',
    reset: 'コードをリセット',
    toggleDoc: 'ドキュメントを表示',
    parameters: 'パラメータ',
    returns: '戻り値',
  },
  zh_hans: {
    searchPlaceholder: '搜索函数...',
    selectFunction: '请选择一个函数',
    reset: '重置代码',
    toggleDoc: '查看文档',
    parameters: '参数',
    returns: '返回值',
  },
};

const CATEGORY_LABELS = {
  en: {
    array: 'Array',
    function: 'Function',
    math: 'Math',
    object: 'Object',
    predicate: 'Predicate',
    promise: 'Promise',
    string: 'String',
    set: 'Set',
    map: 'Map',
    error: 'Error',
    util: 'Util',
  },
  ko: {
    array: '배열',
    function: '함수',
    math: '수학',
    object: '객체',
    predicate: '타입 가드',
    promise: 'Promise',
    string: '문자열',
    set: 'Set',
    map: 'Map',
    error: '에러',
    util: '유틸리티',
  },
  ja: {
    array: '配列',
    function: '関数',
    math: '数学',
    object: 'オブジェクト',
    predicate: '型ガード',
    promise: 'Promise',
    string: '文字列',
    set: 'Set',
    map: 'Map',
    error: 'エラー',
    util: 'ユーティリティ',
  },
  zh_hans: {
    array: '数组',
    function: '函数',
    math: '数学',
    object: '对象',
    predicate: '类型守卫',
    promise: 'Promise',
    string: '字符串',
    set: 'Set',
    map: 'Map',
    error: '错误',
    util: '工具',
  },
};

const t = computed(() => translations[lang.value] || translations.en);

const categories = computed(() =>
  playgroundData.categories.map(cat => ({
    ...cat,
    label: (CATEGORY_LABELS[lang.value] || CATEGORY_LABELS.en)[cat.name] || cat.name,
  }))
);

const examples = playgroundData.examples;
const localizedDocs = playgroundData.localizedDocs;

const searchQuery = ref('');
const showDoc = ref(true);
const selectedFunction = ref('');
const selectedCategory = ref('');
const selectedCategoryLabel = ref('');
const openCategories = ref(new Set(['array']));
const sandpackKey = ref(0);

const docUrl = computed(() => {
  if (!selectedFunction.value || !selectedCategory.value) {
    return null;
  }
  const locale = lang.value;
  const prefix = locale && locale !== 'en' && locale !== 'root' ? `/${locale}` : '';
  return `${prefix}/reference/${selectedCategory.value}/${selectedFunction.value}`;
});

const currentDoc = computed(() => {
  if (!selectedFunction.value) {
    return null;
  }
  const selectKey = `${selectedCategory.value}/${selectedFunction.value}`;
  const locale = lang.value || 'en';
  const localeDocs = localizedDocs[locale] || localizedDocs.en;
  return localeDocs[selectKey] || localizedDocs.en[selectKey] || null;
});

const filteredCategories = computed(() => {
  if (!searchQuery.value) {
    return categories.value;
  }
  const query = searchQuery.value.toLowerCase();
  return categories.value
    .map(category => ({
      ...category,
      functions: category.functions.filter(fn => fn.toLowerCase().includes(query)),
    }))
    .filter(category => category.functions.length > 0);
});

function toggleCategory(name) {
  const next = new Set(openCategories.value);
  if (next.has(name)) {
    next.delete(name);
  } else {
    next.add(name);
  }
  openCategories.value = next;
}

const defaultCode = `import { chunk, groupBy, uniq } from 'es-toolkit';

// ============================================
// es-toolkit Playground
// Try any function from the function list!
// ============================================

// chunk(arr, size)
// Splits an array into smaller arrays of the given size.
const chunked = chunk([1, 2, 3, 4, 5, 6], 2);
console.log('chunk:', chunked);
// [[1, 2], [3, 4], [5, 6]]

// uniq(arr)
// Returns a new array with duplicates removed.
const unique = uniq([1, 2, 2, 3, 3, 3]);
console.log('uniq:', unique);
// [1, 2, 3]

// groupBy(arr, fn)
// Groups array elements by a key returned from the callback.
const grouped = groupBy(
  [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 },
  ],
  item => item.age,
);
console.log('groupBy:', grouped);
`;

const currentCode = ref(defaultCode);

const sandpackFiles = computed(() => ({
  '/index.ts': {
    code: currentCode.value,
    active: true,
  },
}));

function selectFunction(category, fn) {
  const selectKey = `${category.name}/${fn}`;

  selectedCategoryLabel.value = category.label;
  selectedFunction.value = fn;
  selectedCategory.value = category.name;
  openCategories.value = new Set([...openCategories.value, category.name]);

  if (examples[selectKey]) {
    currentCode.value = examples[selectKey];
  } else {
    currentCode.value = `import { ${fn} } from 'es-toolkit';

// Try ${fn} here!
console.log(${fn});
`;
  }
  sandpackKey.value++;
}

function resetCode() {
  const selectKey = `${selectedCategory.value}/${selectedFunction.value}`;
  if (examples[selectKey]) {
    currentCode.value = examples[selectKey];
  } else {
    currentCode.value = defaultCode;
    selectedFunction.value = '';
    selectedCategory.value = '';
  }
  sandpackKey.value++;
}
</script>

<style scoped>
.playground {
  display: flex;
  gap: 16px;
  margin-top: var(--playground-margin-top, 24px);
  height: var(--playground-height, min(calc(100dvh - 200px), 800px));
  min-height: var(--playground-min-height, 500px);
}

.playground-sidebar {
  width: 220px;
  flex-shrink: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.playground-search {
  padding: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.playground-search-input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 13px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
}

.playground-search-input:focus {
  border-color: var(--vp-c-brand-1);
}

.playground-categories {
  overflow-y: auto;
  flex: 1;
}

.playground-category-title {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: none;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
}

.playground-category-title:hover {
  background: var(--vp-c-bg-soft);
}

.playground-category-arrow {
  font-size: 10px;
  transition: transform 0.2s;
  display: inline-block;
}

.playground-category-arrow.open {
  transform: rotate(90deg);
}

.playground-function-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.playground-function-item {
  padding: 4px 12px 4px 28px;
  font-size: 13px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition:
    background 0.15s,
    color 0.15s;
}

.playground-function-item:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.playground-function-item.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.playground-editor {
  flex: 1;
  min-width: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.playground-editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.playground-editor-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.playground-editor-title-link {
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 0.15s;
}

.playground-editor-title-link:hover {
  color: var(--vp-c-brand-1);
}

.playground-header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.playground-doc-toggle {
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.playground-doc-toggle:hover,
.playground-doc-toggle.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.playground-doc-panel {
  flex-shrink: 0;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-size: 13px;
  line-height: 1.6;
  max-height: 200px;
  overflow-y: auto;
}

.playground-doc-desc {
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
}

.playground-doc-section {
  margin-top: 8px;
}

.playground-doc-section h4 {
  margin: 0 0 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.playground-doc-section ul {
  margin: 0;
  padding: 0 0 0 16px;
  list-style: disc;
}

.playground-doc-section li {
  margin: 2px 0;
}

.playground-doc-section code {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.playground-doc-type {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.playground-doc-section p {
  margin: 0;
}

.playground-reset-btn {
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.playground-reset-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.playground-sandpack {
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.playground-sandpack :deep(.sp-preview) {
  display: none !important;
}

.playground-sandpack :deep(.sp-wrapper) {
  border-radius: 0;
  height: 100% !important;
}

.playground-sandpack :deep(.sp-layout) {
  height: 100% !important;
}

.playground-sandpack :deep(.sp-stack) {
  height: 100% !important;
}

.playground-sandpack :deep(.cm-editor) {
  height: 100% !important;
}

.playground-sandpack :deep(.cm-scroller) {
  overflow: auto !important;
}

.playground-sandpack :deep(.sp-layout) {
  display: flex !important;
}
.playground-sandpack :deep(.sp-layout > .sp-stack:first-child) {
  flex: 2 1 0% !important;
}

.playground-sandpack :deep(.sp-layout > .sp-stack:last-child) {
  flex: 1 1 0% !important;
  max-width: 33.333% !important;
}

@media (max-width: 768px) {
  .playground {
    flex-direction: column;
  }

  .playground-sidebar {
    width: 100%;
    max-height: 200px;
  }

  .playground-categories {
    max-height: 150px;
  }
}
</style>

<style>
/* Override VitePress doc layout container width for playground page.
   Uses the pageClass frontmatter instead of :has() for broader browser compatibility. */
.playground-page .VPDoc .container,
.playground-page .VPDoc .content,
.playground-page .VPDoc .content-container {
  max-width: 100% !important;
}
</style>
