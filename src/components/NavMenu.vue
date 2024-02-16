<script setup>
import {RouterLink} from "vue-router"
</script>
<template>
  <div class="footer tw-bg-slate-200 tw-text-black">
    <RouterLink class="btn" to="/">
      <q-icon name="code" />
    </RouterLink>
    <RouterLink class="btn" to="/sales">
      <q-icon name="point_of_sale" />
    </RouterLink>
    <RouterLink class="btn" to="/hr">
      <q-icon name="person" />
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding: 0rem;
  display: flex;
  justify-items: center;

  .btn {
    padding: 0.5rem;
    flex-grow: 1;
    text-align: center;
    font-size: 2rem;
    text-transform: uppercase;

    &.router-link-exact-active {
      background-color: $primary;

      i {
        color: white;
      }
    }
  }
}
</style>
