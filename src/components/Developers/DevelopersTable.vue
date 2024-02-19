<script setup>
import DevelopersTableRow from "components/Developers/DevelopersTableRow.vue";
import ProjectsDeveloperTimer from "components/Projects/ProjectsDeveloperTimer.vue"
import {useHelpers} from "src/composables/useHelpers"

let {getDevSalary, formatMoney} = useHelpers()

const props = defineProps({
  rows: Array,
});
</script>
<template>
  <table>
    <tbody>
      <q-list>
        <q-item
          v-for="dev in rows"
          :key="dev.id"
          class="q-mb-sm"
        >
          <q-item-section avatar>

            <q-avatar
              v-if="dev.project == null"
              class="tw-rounded-full tw-border tw-border-cyan-200 tw-overflow-hidden"
            >
              <img :src="dev.avatar" />
            </q-avatar>
            <div v-else>
              <ProjectsDeveloperTimer :project="dev.project" />
            </div>

          </q-item-section>
          <q-item-section>
            <q-item-label>{{ dev.name }}</q-item-label>
            <q-item-label caption lines="1"
              ><small>€ {{ formatMoney(getDevSalary(dev)) }}/mese</small></q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-badge
              v-if="dev.seniority == 1"
              color="green"
              rounded
              outline
              label="junior"
            />
            <q-badge
              v-if="dev.seniority == 2"
              color="orange"
              rounded
              outline
              label="mid"
            />
            <q-badge
              v-if="dev.seniority == 3"
              color="red"
              rounded
              outline
              label="senior"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
}
</style>
