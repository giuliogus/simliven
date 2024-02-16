<script setup>
import { storeToRefs } from "pinia";
import { useGameStore } from "src/stores/GameStore.js";

import SalesTable from "src/components/Sales/SalesTable.vue";

var { loading, salesmen, error } = storeToRefs(useGameStore());
</script>
<template>
  <q-page class="tw-py-8 tw-px-4">
    <h1>Sales</h1>

    <SalesTable v-if="!loading" :rows="salesmen" />

    <div
      class="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center"
      v-if="loading"
    >
      <q-spinner color="primary" size="3em" />
    </div>
  </q-page>
</template>
<style lang="scss" scoped>
h1 {
  color: $primary;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid $primary;
  line-height: normal;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}
</style>