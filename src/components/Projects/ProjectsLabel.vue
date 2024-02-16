<script setup>
var props = defineProps({
  row: Object,
});
</script>
<template>
  <div class="tw-font-bold">
    {{ row.name }}
  </div>
  <div class="tw-flex tw-items-center tw-gap-2">
    <q-badge v-if="row.complexity == 1" color="green" rounded />
    <q-badge v-if="row.complexity == 2" color="orange" rounded />
    <q-badge v-if="row.complexity == 3" color="red" rounded />
    <small class="text-primary tw-pt-[0.2rem]">€ {{ row.amount }}</small>
  </div>
  <div>
    <q-badge
      outline
      color="orange"
      v-if="row.status == 'pending'"
      :label="row.status"
    />
  </div>
</template>
