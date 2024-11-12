<template>
  <canvas id="downloadChart" width="800" height="400"></canvas>
</template>

<script>
export default {
  data() {
    return {
      downloads: [],
      labels: [],
      packageName: 'es-toolkit',
    };
  },
  async mounted() {
    await this.fetchDownloads();
    this.drawChart();
  },
  methods: {
    async fetchDownloads() {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(endDate.getFullYear() - 1);

      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];
      const url = `https://api.npmjs.org/downloads/range/${start}:${end}/${this.packageName}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const weeklyDownloads = [];
        const weeklyLabels = [];
        let weeklySum = 0;
        data.downloads.forEach((item, index) => {
          weeklySum += item.downloads;
          if ((index + 1) % 7 === 0 || index === data.downloads.length - 1) {
            weeklyDownloads.push(weeklySum);
            weeklyLabels.push(item.day);
            weeklySum = 0;
          }
        });

        this.downloads = weeklyDownloads;
        this.labels = weeklyLabels;
      } catch (error) {
        console.error('Error fetching download data:', error);
        alert('Failed to fetch data from npm API.');
      }
    },
    drawChart() {
      const canvas = document.getElementById('downloadChart');
      const ctx = canvas.getContext('2d');

      const maxDownload = Math.ceil(Math.max(...this.downloads) / 10000) * 10000;

      const padding = 50;
      const chartWidth = canvas.width - padding * 2;
      const chartHeight = canvas.height - padding * 2;

      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000';
      ctx.fillText('es-toolkit npm weekly downloads', canvas.width / 2, 30);

      ctx.strokeStyle = '#000';
      ctx.beginPath();
      ctx.moveTo(padding, padding + 20);
      ctx.lineTo(padding, canvas.height - padding);
      ctx.lineTo(canvas.width - padding, canvas.height - padding);
      ctx.stroke();

      ctx.font = '10px Arial';
      this.labels.forEach((label, index) => {
        const x = padding + (chartWidth / (this.labels.length - 1)) * index;
        const y = canvas.height - padding + 20;
        const date = new Date(label);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedLabel = `${year}/${month}/${day}`;

        if (index % Math.floor(this.labels.length / 10) === 0) {
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          ctx.fillText(formattedLabel, x, y);
        }
      });

      const yStep = Math.ceil(maxDownload / 5 / 10000) * 10000;
      ctx.font = '12px Arial';
      for (let i = 0; i <= 5; i++) {
        const value = maxDownload - i * yStep;
        if (value < 0) break;

        const y = padding + (chartHeight - (chartHeight / maxDownload) * value);

        ctx.strokeStyle = '#d3d3d3';
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();

        ctx.fillStyle = '#000';
        ctx.textAlign = 'right';
        ctx.fillText(value, padding - 10, y + 5);
      }

      ctx.strokeStyle = '#007bff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      this.downloads.forEach((download, index) => {
        const x = padding + (chartWidth / (this.downloads.length - 1)) * index;
        const y = padding + chartHeight - chartHeight * (download / maxDownload);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    },
  },
};
</script>
