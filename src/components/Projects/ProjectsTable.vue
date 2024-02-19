<script setup>
import ProjectsTableRow from "components/Projects/ProjectsTableRow.vue";

const props = defineProps({
  rows: Array,
});
</script>
<template>
  <table>
    <tbody>
      <ProjectsTableRow
        v-for="row in rows"
        :key="row.id"
        :row="row"
      />
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
}
</style>
