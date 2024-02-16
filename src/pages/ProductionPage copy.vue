<script setup>
import {storeToRefs} from "pinia"
import {useGameStore} from "src/stores/GameStore.js"

import ProjectsTable from "src/components/Projects/ProjectsTable.vue"

var {loading, incompleteProjects, error} = storeToRefs(useGameStore())
</script>
<template>
  <q-page class="tw-py-8 tw-px-4">
    <h1>Produzione</h1>

    <ProjectsTable
      v-if="!loading && incompleteProjects.length > 0"
      :rows="incompleteProjects"
    />
    <div v-if="loading || !incompleteProjects.length">
      <div class="tw-text-center">in attesa che arrivino progetti</div>
      <div class="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center">
        <q-spinner color="primary" size="3em" />
      </div>
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
