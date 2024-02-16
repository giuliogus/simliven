<script setup>
import { storeToRefs } from "pinia";
import { useGameStore } from "src/stores/GameStore.js";
import ProjectsLabel from "components/Projects/ProjectsLabel.vue";
import ProjectsDeveloperTimer from "components/Projects/ProjectsDeveloperTimer.vue";
import { ref } from "vue";

const props = defineProps({
  row: Object,
});

var game = useGameStore();
var { selectedProject } = storeToRefs(game);
</script>
<template>
  <tr
    @click.stop="selectedProject = row"
    :class="selectedProject == row ? 'tw-bg-slate-100 text-primary' : ''"
  >
    <td>
      <ProjectsLabel :row="row" />
    </td>
    <td>
      <q-icon v-if="row.developer == null" name="arrow_forward_ios" class="tw-text-2xl tw-text-slate-300" />
      <div v-else>

        <ProjectsDeveloperTimer :project="row" />

      </div>
    </td>
  </tr>
</template>
<style lang="scss" scoped>
tr {
  td {
    padding: 1rem 0.5rem;
    border-bottom: 1px solid #eee;
  }
}
</style>
