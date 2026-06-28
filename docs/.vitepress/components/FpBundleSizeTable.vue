<template>
  <div class="bundle-size-table">
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="key in seriesKeys" :key="key">
            {{ labels[key] }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td>{{ row.name }}</td>
          <td v-for="value in row.values" :key="value.key">
            {{ formatBytes(value.size) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import raw from '../../data/fp-bundle-size.json';

const data = raw.data || {};
const labels = raw.labels || {};
const seriesKeys = Object.keys(labels);

const rows = Object.keys(data).map(name => {
  const values = seriesKeys.map(key => ({
    key,
    size: Number(data[name]?.[key] || 0),
  }));

  return { name, values };
});

function formatBytes(size) {
  return `${size.toLocaleString()} bytes`;
}
</script>
