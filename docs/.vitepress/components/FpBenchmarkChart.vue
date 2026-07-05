<template>
  <div :style="{ width: '100%', height: computedHeight + 'px' }">
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script setup>
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'vue-chartjs';
import raw from '../../data/fp-benchmark-results.json';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const data = raw.data || {};
const labels = Object.keys(data);
const seriesKeys = Object.keys(raw.labels || {});

const PALETTE = [
  { bg: 'rgba(59,130,246,0.9)', border: 'rgba(59,130,246,1)' },
  { bg: 'rgba(239,68,68,0.9)', border: 'rgba(239,68,68,1)' },
  { bg: 'rgba(16,185,129,0.9)', border: 'rgba(16,185,129,1)' },
];

const rowHeight = 56;
const minHeight = 260;
const extraPadding = 40;
const computedHeight = Math.max(minHeight, labels.length * rowHeight + extraPadding);
const numberFormatter = new Intl.NumberFormat('en-US');

const datasets = seriesKeys.map((key, index) => {
  const values = labels.map(name => Number(data[name]?.[key] || 0));
  const color = PALETTE[index % PALETTE.length];

  return {
    label: raw.labels[key] || key,
    data: values,
    backgroundColor: color.bg,
    borderColor: color.border,
    borderWidth: 0,
    barThickness: 18,
  };
});

const chartData = {
  labels,
  datasets,
};

const options = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 0,
  },
  interaction: {
    mode: 'nearest',
    intersect: true,
  },
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: true,
      position: 'top',
      align: 'center',
    },
    tooltip: {
      enabled: true,
      mode: 'nearest',
      intersect: true,
      position: 'nearest',
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        callback: value => numberFormatter.format(Number(value)),
      },
      grid: {
        display: true,
        drawBorder: false,
      },
      title: {
        display: true,
        text: 'Executions per second',
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
</script>
