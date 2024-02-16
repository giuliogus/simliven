<script setup>
import { useGameStore } from "src/stores/GameStore";
import { computed } from "vue";
import { useHelpers } from "src/composables/useHelpers";

let { formatMoney } = useHelpers();
var game = useGameStore();

</script>
<template>
  <div class="footer tw-bg-slate-100 tw-text-black tw-border-t-4 tw-p-4 tw-flex tw-items-center tw-justify-between">
    <div>Saldo:</div>
    <h3 class="tw-text-2xl tw-font-bold tw-text-right" :class="game.amount > 0 ? 'text-primary' : 'text-red'">
      € {{ formatMoney(game.amount) }}
    </h3>
  </div>
</template>
