<template>
  <t-row :gutter="[24, 24]">
    <t-col :flex="3">
      <div class="user-left-greeting">
        <div>
          Hi，Image
          <span class="regular"> {{ t('pages.user.markDay') }}</span>
        </div>
        <img src="@/assets/assets-chernblog-logo.png" class="logo" />
      </div>

      <t-card class="user-info-list" :title="t('pages.user.personalInfo.title')" :bordered="false">
        <template #actions>
          <t-button theme="default" shape="square" variant="text">
            <t-icon name="ellipsis" />
          </t-button>
        </template>
        <t-descriptions :column="4" item-layout="vertical">
          <t-descriptions-item v-for="(item, index) in USER_INFO_LIST" :key="index" :label="t(item.title)">
            {{ item.content }}
          </t-descriptions-item>
        </t-descriptions>
      </t-card>
    </t-col>

    <t-col :flex="1">
      <t-card class="user-intro" :bordered="false">
        <t-avatar size="80px">CB</t-avatar>
        <div class="name">Chern</div>
        <div class="position">chern blog manager管理员</div>
      </t-card>
    </t-col>
  </t-row>
</template>
<script setup lang="ts">
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { computed, nextTick, onMounted, onUnmounted, watch } from 'vue';

import { t } from '@/locales';
import { useSettingStore } from '@/store';
import { changeChartsTheme } from '@/utils/color';

import { USER_INFO_LIST } from './constants';
import { getFolderLineDataSet } from './index';

defineOptions({
  name: 'UserIndex',
});

echarts.use([GridComponent, TooltipComponent, LineChart, CanvasRenderer, LegendComponent]);

let lineContainer: HTMLElement;
let lineChart: echarts.ECharts;
const store = useSettingStore();
const chartColors = computed(() => store.chartColors);

const initChart = () => {
  lineContainer = document.getElementById('lineContainer');
  lineChart = echarts.init(lineContainer);
  lineChart.setOption({
    grid: {
      x: 30, // 默认是80px
      y: 30, // 默认是60px
      x2: 10, // 默认80px
      y2: 30, // 默认60px
    },
    ...getFolderLineDataSet({ ...chartColors.value }),
  });
};

const updateContainer = () => {
  lineChart?.resize({
    width: lineContainer.clientWidth,
    height: lineContainer.clientHeight,
  });
};

onMounted(() => {
  nextTick(() => {
    initChart();
  });
  window.addEventListener('resize', updateContainer, false);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateContainer);
});

watch(
  () => store.brandTheme,
  () => {
    changeChartsTheme([lineChart]);
  },
);
</script>
<style lang="less" scoped>
@import './index.less';

.t-descriptions {
  margin-top: 24px;
}
</style>
