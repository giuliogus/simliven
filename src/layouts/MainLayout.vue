<script setup>
import NavMenu from "src/components/NavMenu.vue"
import NavInfo from "src/components/NavInfo.vue"
import ProjectsDrawerPanel from "src/components/Projects/ProjectsDrawerPanel.vue"
import {ref} from "vue"
import {useRoute} from "vue-router"

import {watch} from "vue"
import {storeToRefs} from "pinia"
import {useGameStore} from "src/stores/GameStore.js"
import { useQuasar } from "quasar"

var game = useGameStore()
var {selectedProject, amount} = storeToRefs(game)

game.quasar = useQuasar();

var route = useRoute()
const rightDrawerOpen = ref(false)
const gameOver = ref(false)

watch(selectedProject, (selP) => {
  if (selP) {
    rightDrawerOpen.value = true
  }
})

watch(amount, (money) => {
  if (money < 0) {
    gameOver.value = true
  }
})

function clickOutside() {
  selectedProject.value = null
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>

<template>
  <q-layout view="lHh Lpr lFf" v-if="!gameOver">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="tw-font-bold" @click="game.restart();gameOver=false"> SimLiven </q-toolbar-title>

        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleRightDrawer"
        /> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      show-if-above
      side="right"
      overlay
      no-swipe-backdrop
      @hide="clickOutside()"
    >
      <q-list>
        <q-item-label header>
          <div class="tw-flex tw-justify-end tw-items-center">
            <q-icon name="close" class="tw-text-3xl" @click="toggleRightDrawer" />
          </div>

          <ProjectsDrawerPanel v-if="route.name == 'production'" />
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container @click="clickOutside()">
      <router-view />
    </q-page-container>

    <q-footer reveal>
      <NavInfo />
      <NavMenu />
    </q-footer>
  </q-layout>

  <div
    v-else
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 2rem">GAME OVER</div>

      <div class="tw-text-2xl" style="opacity: 0.4">Oops...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        label="Riprova"
        @click="game.restart();gameOver=false"
        no-caps
      />
    </div>
  </div>
</template>

<style></style>
