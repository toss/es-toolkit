<script setup>
import { data } from '../libs/compatibility.data.mts';

const props = defineProps({
  lang: String,
});

const localized = {
  en: {
    functionName: 'Function Name',
    implementationStatus: 'Implementation Status',
    method: 'method',
    noSupport: 'No support',
  },
  ko: {
    functionName: '함수 이름',
    implementationStatus: '구현 상태',
    method: '메소드',
    noSupport: '지원하지 않음',
  },
  ja: {
    functionName: '関数名',
    implementationStatus: '実装状況',
    method: 'メソッド',
    noSupport: 'サポートなし',
  },
  zh_hans: {
    functionName: '函数名称',
    implementationStatus: '实现状态',
    method: '工具',
    noSupport: '不支持',
  },
};

const categories = Object.keys(data);
const titles = categories.map(
  category => `"${category.charAt(0).toUpperCase()}${category.slice(1)}" ${localized[props.lang].method}`
);
const ids = titles.map(title => title.toLowerCase().replaceAll('"', '').replace(' ', '-'));
</script>

<template>
  <template
    v-for="(category, index) in categories"
    :key="category"
  >
    <h3
      :id="ids[index]"
      tabindex="-1"
    >
      {{ titles[index] }}
      <a
        class="header-anchor"
        :href="`#${ids[index]}`"
        :aria-label="`Permalink to ${ids[index]}`"
      />
    </h3>
    <table tabindex="0">
      <thead>
        <tr>
          <th>{{ localized[props.lang].functionName }}</th>
          <th>{{ localized[props.lang].implementationStatus }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in data[category]"
          :key="item.name"
        >
          <td>
            <a
              :href="`https://lodash.com/docs/4.17.15#${item.name}`"
              target="_blank"
              rel="noopener noreferrer"
            >{{
              item.name
            }}</a>
          </td>
          <td v-if="item.status === 'No support'">
            {{ localized[props.lang].noSupport }}
          </td>
          <td v-else>
            {{ item.status }}
          </td>
        </tr>
      </tbody>
    </table>
  </template>
</template>
