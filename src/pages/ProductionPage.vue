<script setup>
import {storeToRefs} from "pinia"
import {useGameStore} from "src/stores/GameStore.js"

import ProjectsTable from "src/components/Projects/ProjectsTable.vue"
import DevelopersTable from "src/components/Developers/DevelopersTable.vue"
import { ref } from "vue";

var {loading, developers, incompleteProjects, error} = storeToRefs(useGameStore())

var tab = ref(0);

</script>
<template>
  <q-page class="tw-py-8 tw-px-4">

    <div class="tw-flex tw-items-center tw-justify-between tw-gap-8">
      <h1 class="tw-w-1/2" :class="tab == 0 ? 'text-primary active' : 'tw-text-gray-300'" @click="tab=0">Progetti</h1>
      <h1 class="tw-w-1/2 tw-text-right" :class="tab == 1 ? 'text-primary active' : 'tw-text-gray-300'" @click="tab=1">Sviluppatori</h1>
    </div>

    <div v-if="tab == 0">
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
    </div>
    <div v-else>

      <DevelopersTable
        v-if="!loading"
        :rows="developers"
      />
    </div>


  </q-page>
</template>
<style lang="scss" scoped>
h1 {
  font-size: 1.5rem;
  font-weight: bold;
  
  line-height: normal;
  padding-bottom: 1rem;
  margin-bottom: 2rem;

  &.active {
    border-bottom: 1px solid $primary;
  }
}
</style>
