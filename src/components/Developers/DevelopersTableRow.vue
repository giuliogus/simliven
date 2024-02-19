<script setup>
import ProjectsLabel from "components/Projects/ProjectsLabel.vue";
import ProjectsDeveloperTimer from "components/Projects/ProjectsDeveloperTimer.vue";

const props = defineProps({
  row: Object,
});
</script>
<template>
  <tr
    :class="selectedProject == row ? 'tw-bg-slate-100 text-primary' : ''"
  >
    <td>

      <div v-if="row.project !== null">
        <ProjectsDeveloperTimer :project="row" />
      </div>
      <div v-else>
        
      </div>

    </td>
    <td>
      <div v-if="row.project !== null">

        <ProjectsLabel :row="row" />

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
