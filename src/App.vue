<template>
  <router-view />
</template>

<script setup>
import { useGameStore } from "src/stores/GameStore";
const { init } = useGameStore();
init();
</script>
