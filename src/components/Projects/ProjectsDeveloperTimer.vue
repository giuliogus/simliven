<script setup>
import {useGameStore} from "src/stores/GameStore"
import {onBeforeUnmount, onMounted, ref} from "vue"
// import { useQuasar } from 'quasar';

const props = defineProps({
  project: Object,
})

var game = useGameStore()
var progress = ref(game.getProjectProgression(props.project))
var clock = null;

onMounted(() => {
  var clock = setInterval(() => {
    progress.value = game.getProjectProgression(props.project);
  }, 1000);
})

onBeforeUnmount(() => {
  clearInterval(clock);
})
</script>

<template>
  <q-knob
    readonly
    show-value
    v-model="progress"
    :thickness="0.25"
    color="primary"
    track-color="grey-3"
  >
    <q-avatar
      class="tw-rounded-full tw-overflow-hidden tw-bg-white tw-w-[35px] tw-h-[35px]"
    >
      <img :src="project.developer.avatar" />
    </q-avatar>
  </q-knob>
</template>
