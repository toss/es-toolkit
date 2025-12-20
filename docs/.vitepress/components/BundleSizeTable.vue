<template>
  <div class="bundle-size-table">
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="k in seriesKeys" :key="k">{{ labels[k] }}</th>
          <th v-if="seriesKeys.length >= 2">Difference</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td>
            {{ row.name }}
          </td>
          <td v-for="(val, i) in row.values" :key="i">{{ formatBytes(val) }}</td>
          <td v-if="seriesKeys.length >= 2">{{ formatPercent(row.diffPercent) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import raw from '../../data/bundle-size.json'

const data = raw.data || {}
const labels = raw.labels || {}
const seriesKeys = Object.keys(labels)

const rows = Object.keys(data).map((name) => {
  const item = data[name] || {}
  const values = seriesKeys.map((k) => Number(item[k] || 0))
  let diffPercent = 0
  if (values.length >= 2 && values[1]) {
    diffPercent = ((values[0] - values[1]) / values[1]) * 100
  }
  return { name, values, diffPercent }
})

function formatBytes(n) {
  return `${n} bytes`
}

function formatPercent(v) {
  return `${v.toFixed(1)}%`
}
</script>
