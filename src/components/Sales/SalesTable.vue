<script setup>
import {useHelpers} from "src/composables/useHelpers"
import SalesManTimer from "src/components/Sales/SalesManTimer.vue"

let {getSaleSalary, formatMoney} = useHelpers()

const props = defineProps({
  rows: Array,
})
</script>

<template>
  <q-list>
    <q-item v-for="row in rows" :key="row.id" class="q-mb-sm">
      <q-item-section avatar>
        <q-avatar class="tw-rounded-full tw-border tw-border-cyan-200 tw-overflow-hidden">
          <img :src="row.avatar" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ row.name }}</q-item-label>
        <q-item-label caption lines="1">
          <small>€ {{ formatMoney(getSaleSalary(row)) }}/mese</small>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-badge
          v-if="row.experience == 1"
          color="green"
          rounded
          outline
          label="junior"
        />
        <q-badge v-if="row.experience == 2" color="orange" rounded outline label="mid" />
        <q-badge v-if="row.experience == 3" color="red" rounded outline label="senior" />
      </q-item-section>
      <q-item-section side>
        <SalesManTimer :salesman="row" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
}
</style>
