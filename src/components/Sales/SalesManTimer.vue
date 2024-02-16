<script setup>
import {useGameStore} from "src/stores/GameStore"
import {onBeforeUnmount, onMounted, ref} from "vue"
// import { useQuasar } from 'quasar';

const props = defineProps({
  salesman: Object,
})

var game = useGameStore()
var progress = ref(game.getSeekingProgression(props.salesman))
var clock = null;

onMounted(() => {
  var clock = setInterval(() => {
    progress.value = game.getSeekingProgression(props.salesman);
  }, 1000);
})

onBeforeUnmount(() => {
  clearInterval(clock);
})
</script>

<template>
  <q-knob
    readonly
    v-model="progress"
    :thickness="1"
    color="primary"
    track-color="grey-3"
  />
</template>
