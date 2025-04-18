<script setup lang="ts">
import { useTheme } from 'vuetify'
import { hexToRgb } from '@core/utils/colorConverter'

const vuetifyTheme = useTheme()

const options = computed(() => {
  const currentTheme = ref(vuetifyTheme.current.value.colors)
  const variableTheme = ref(vuetifyTheme.current.value.variables)

  const secondaryTextColor = `rgba(${hexToRgb(currentTheme.value['on-surface'])},${variableTheme.value['medium-emphasis-opacity']})`
  const primaryTextColor = `rgba(${hexToRgb(currentTheme.value['on-surface'])},${variableTheme.value['high-emphasis-opacity']})`

  return {
    chart: {
      sparkline: { enabled: true },
    },
    labels: ['Cricket'],
    stroke: { lineCap: 'round' },
    grid: {
      padding: {
        top: -10,
      },
    },
    colors: [currentTheme.value.info],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.2,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.1,
        stops: [0, 90],
      },
    },
    states: {
      hover: {
        filter: { type: 'none' },
      },
      active: {
        filter: { type: 'none' },
      },
    },
    plotOptions: {
      radialBar: {
        endAngle: 180,
        startAngle: -180,
        inverseOrder: true,
        hollow: { size: '62%' },
        track: {
          background: currentTheme.value['track-bg'],
        },
        dataLabels: {
          name: { offsetY: 26 },
          value: {
            offsetY: -14,
            fontSize: '24px',
            fontWeight: 500,
            color: primaryTextColor,
            formatter: (value: unknown) => `${value}k`,
          },
          total: {
            show: true,
            label: 'Growth',
            fontSize: '15px',
            fontWeight: 500,
            color: secondaryTextColor,
          },
        },
      },
    },
  }
})

const series = [78]
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Total Visits</VCardTitle>
      <template #append>
        <div class="me-n3">
          <MoreBtn density="compact" />
        </div>
      </template>
    </VCardItem>

    <VueApexCharts
      type="radialBar"
      :options="options"
      :series="series"
      :height="199"
    />
    <VCardText class="text-center pt-0">
      <div class="text-body-1 mb-2">
        42.2k new visits
      </div>

      <VChip
        color="info"
        size="small"
      >
        This year
      </VChip>
    </VCardText>
  </VCard>
</template>
