<template>
  <div class="lazy-sim">
    <div class="sim-head">
      <code class="sim-pipe">{{ text.pipe }}</code>
    </div>
    <p class="sim-legend">{{ text.legend }}</p>

    <div class="sim-grid">
      <section
        v-for="panel in panels"
        :key="panel.key"
        class="sim-col"
        :class="{ accent: panel.key === 'lazy', done: isDone(panel) }"
      >
        <header>
          <span class="sim-tag">{{ text[panel.key] }}</span>
          <span class="sim-cap">{{ text[panel.key + 'Cap'] }}</span>
        </header>

        <!-- fixed-size grid: every cell always rendered; only its class changes -->
        <div class="hm">
          <span class="hm-corner"></span>
          <span v-for="n in 6" :key="'h' + n" class="hm-colh">{{ n }}</span>

          <template v-for="row in panel.rows" :key="row.label">
            <span class="hm-rowh">{{ row.label }}</span>
            <span v-for="(c, i) in row.cells" :key="i" class="hm-cell" :class="cellClass(c)">{{ cellText(c) }}</span>
          </template>
        </div>

        <footer>
          <span
            ><b>{{ worked(panel) }}</b> {{ text.cells }}</span
          >
          <span
            ><b>{{ arrays(panel) }}</b> {{ text.arrays }}</span
          >
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const { lang } = useData();

const i18n = {
  'en-US': {
    pipe: 'pipe([1,2,3,4,5,6], filter(even), map(×10), take(2))',
    legend:
      'A filled square = work actually done. Eager fills the whole grid; lazy stops early, so it finishes sooner.',
    eager: 'Eager',
    eagerCap: 'every step runs over the whole array',
    lazy: 'Lazy fusion',
    lazyCap: 'one element at a time — stops early',
    cells: 'squares of work',
    arrays: 'arrays',
  },
};
const text = computed(() => i18n[lang.value] || i18n['en-US']);

// kind: pass | drop | map | take | skip | off(never runs)
// revealAt: tick at which the cell turns on (null = stays off)
const off = { kind: 'off', revealAt: null, val: '' };
const c = (kind, val, revealAt) => ({ kind, val, revealAt });

// Eager: sweeps the whole array, row by row (filter 1..6, then map, then take) → 11 ticks.
const eager = {
  key: 'eager',
  rows: [
    { label: 'filter', cells: [1, 2, 3, 4, 5, 6].map((v, i) => c(v % 2 === 0 ? 'pass' : 'drop', v, i + 1)) },
    { label: 'map', cells: [off, c('map', 20, 7), off, c('map', 40, 8), off, c('map', 60, 9)] },
    { label: 'take', cells: [off, c('take', 20, 10), off, c('take', 40, 11), off, off] },
  ],
  lastTick: 11,
};

// Lazy: one element flows all the way down, then stops at element 4 → done by tick 8.
const lazy = {
  key: 'lazy',
  rows: [
    {
      label: 'filter',
      cells: [c('drop', 1, 1), c('pass', 2, 2), c('drop', 3, 5), c('pass', 4, 6), c('skip', 5, 8), c('skip', 6, 8)],
    },
    { label: 'map', cells: [off, c('map', 20, 3), off, c('map', 40, 7), off, off] },
    { label: 'take', cells: [off, c('take', 20, 4), off, c('take', 40, 8), off, off] },
  ],
  lastTick: 8,
};

const panels = [eager, lazy];
const LAST = 11; // longest timeline
const tick = ref(0);

const isOn = cell => cell.revealAt != null && tick.value >= cell.revealAt;
function cellClass(cell) {
  if (cell.kind === 'off') return 'off';
  if (!isOn(cell)) return 'pending';
  return cell.kind;
}
function cellText(cell) {
  if (cell.kind === 'off' || cell.kind === 'skip' || !isOn(cell)) return '';
  return cell.val;
}
const RUN = ['pass', 'drop', 'map', 'take'];
function worked(panel) {
  let n = 0;
  for (const row of panel.rows) {
    for (const cell of row.cells) {
      if (RUN.includes(cell.kind) && isOn(cell)) n++;
    }
  }
  return n;
}
// Eager builds one array per stage (each row that has run); lazy fills a single result array.
function arrays(panel) {
  if (panel.key === 'lazy') return worked(panel) > 0 ? 1 : 0;
  return panel.rows.filter(row => row.cells.some(cell => RUN.includes(cell.kind) && isOn(cell))).length;
}
const isDone = panel => tick.value >= panel.lastTick;

let timer = null;
const STEP = 360;
const PAUSE = 1300;
function next() {
  if (tick.value < LAST) {
    tick.value++;
    timer = setTimeout(next, STEP);
  } else {
    timer = setTimeout(() => {
      tick.value = 0;
      timer = setTimeout(next, STEP);
    }, PAUSE);
  }
}
function start() {
  if (!timer) timer = setTimeout(next, STEP);
}
function stop() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

onMounted(() => {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    tick.value = LAST;
    return;
  }
  if (typeof IntersectionObserver === 'undefined') {
    start();
    return;
  }
  const root = document.querySelector('.lazy-sim');
  if (!root) {
    start();
    return;
  }
  const io = new IntersectionObserver(
    entries => {
      if (entries.some(e => e.isIntersecting)) start();
      else stop();
    },
    { threshold: 0.35 }
  );
  io.observe(root);
});
onUnmounted(stop);
</script>

<style scoped>
.lazy-sim {
  margin: 1.5em 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-code-block-bg);
  padding: 16px 18px;
  font-size: 0.85em;
}
.sim-head {
  display: flex;
}
.sim-pipe {
  font-family: var(--vp-font-family-mono);
  font-size: 0.92em;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  padding: 4px 8px;
  border-radius: 6px;
}
.sim-legend {
  margin: 10px 0 16px;
  color: var(--vp-c-text-3);
  font-size: 0.9em;
}
.sim-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 640px) {
  .sim-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
.sim-col header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}
.sim-tag {
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.sim-col.accent .sim-tag {
  color: var(--vp-c-brand-1);
}
.sim-cap {
  font-size: 0.85em;
  color: var(--vp-c-text-3);
}

/* lazy finishes first → a subtle "done" cue */
.sim-col.accent.done .sim-tag::after {
  content: ' ✓';
  color: var(--vp-c-brand-1);
}

/* fixed-size grid → height never changes → no layout shift on mobile */
.hm {
  display: grid;
  grid-template-columns: 3em repeat(6, 1fr);
  gap: 5px;
  align-items: center;
}
.hm-corner {
  height: 18px;
}
.hm-colh {
  text-align: center;
  font-size: 0.8em;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}
.hm-rowh {
  font-size: 0.82em;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}
.hm-cell {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.82em;
  border: 1px solid transparent;
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    opacity 0.25s ease;
}
.hm-cell.off,
.hm-cell.pending {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
  opacity: 0.45;
}
.hm-cell.pass,
.hm-cell.map {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
.hm-cell.take {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  font-weight: 700;
}
.hm-cell.drop {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-3);
  text-decoration: line-through;
  opacity: 0.7;
}
.hm-cell.skip {
  background: transparent;
  border: 1px dashed var(--vp-c-divider);
  opacity: 0.4;
}
.sim-col footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  flex-wrap: wrap;
}
.sim-col footer b {
  color: var(--vp-c-text-1);
  font-size: 1.15em;
}
.sim-col.accent footer b {
  color: var(--vp-c-brand-1);
}
</style>
