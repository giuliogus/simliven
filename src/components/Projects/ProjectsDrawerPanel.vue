<script setup>
import {ref} from "vue"
import {storeToRefs} from "pinia"
import {useGameStore} from "src/stores/GameStore.js"
import ProjectsLabel from "components/Projects/ProjectsLabel.vue"
import ProjectsDeveloperTimer from "./ProjectsDeveloperTimer.vue"
import {useHelpers} from "src/composables/useHelpers"

let {getDevSalary, formatMoney} = useHelpers()

var game = useGameStore()
var {selectedProject, freeDevelopers} = storeToRefs(game)

var showConfirm = ref(false)
var selectedDev = ref(null)

function selectDev(dev) {
  showConfirm.value = true
  selectedDev.value = dev
}

function confirmDev() {
  game.assignProject(selectedProject.value, selectedDev.value)
  showConfirm.value = false
  selectedDev.value = null
}
</script>

<template>
  <h2>Assegna progetto</h2>
  <div v-if="selectedProject == null">seleziona un progetto</div>
  <div v-else class="tw-px-4">
    <div class="tw-mb-8">
      <table class="tw-w-full tw-mt-8">
        <tbody>
          <ProjectsLabel :row="selectedProject" />
        </tbody>
      </table>
    </div>

    <div v-if="selectedProject.developer == null">
      <div v-if="!freeDevelopers.length">
        <div class="text-red">Non ci sono sviluppatori liberi al momento</div>
      </div>
      <div v-else>
        <q-list>
          <q-item-label header class="text-primary tw-font-bold">
            Scegli lo sviluppatore
          </q-item-label>
          <q-item
            v-for="dev in freeDevelopers"
            :key="dev.id"
            class="q-mb-sm"
            clickable
            v-ripple
            @click="selectDev(dev)"
          >
            <q-item-section avatar>
              <q-avatar
                class="tw-rounded-full tw-border tw-border-cyan-200 tw-overflow-hidden"
              >
                <img :src="dev.avatar" />
              </q-avatar>
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
      </div>

      <q-dialog v-model="showConfirm" persistent>
        <q-card>
          <q-card-section class="row items-center tw-justify-center">
            <q-avatar
              class="tw-rounded-full tw-border-2 tw-border-cyan-200 tw-overflow-hidden"
            >
              <img :src="selectedDev.avatar" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <span class="tw-text-left">
              Sei sicuro di voler affidare il progetto a:
            </span>
            <br />
            <strong>{{ selectedDev.name }}?</strong>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Annulla" color="gray" v-close-popup />
            <q-btn flat label="Confermo" color="primary" @click="confirmDev()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div v-else>
      <div class="text-primary tw-font-bold">Progetto affidato a:</div>
      <div class="tw-mt-8">
        <q-card flat class="">
          <q-card-section class="tw-flex tw-items-center tw-gap-4">
            <ProjectsDeveloperTimer :project="selectedProject" />

            <div>
              <strong>{{ selectedProject.developer.name }}</strong>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  color: $primary;
  border-bottom: 1px solid $primary;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
