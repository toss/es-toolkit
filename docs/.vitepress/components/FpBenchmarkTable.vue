<template>
  <div class="bundle-size-table">
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="key in seriesKeys" :key="key">
            {{ labels[key] }}
          </th>
          <th>Fastest</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td>{{ row.name }}</td>
          <td v-for="value in row.values" :key="value.key">
            {{ formatOps(value.ops) }}
          </td>
          <td>{{ row.fastest }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import raw from '../../data/fp-benchmark-results.json';

const data = raw.data || {};
const labels = raw.labels || {};
const seriesKeys = Object.keys(labels);

const rows = Object.keys(data).map(name => {
  const values = seriesKeys.map(key => ({
    key,
    ops: Number(data[name]?.[key] || 0),
  }));
  const fastest = values.reduce((best, current) => {
    return current.ops > best.ops ? current : best;
  }, values[0]);

  return {
    name,
    values,
    fastest: labels[fastest.key] || fastest.key,
  };
});

function formatOps(ops) {
  return `${ops.toLocaleString()} ops/sec`;
}
</script>
