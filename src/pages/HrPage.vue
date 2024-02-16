<script setup>
import { useGameStore } from "src/stores/GameStore.js";
import {useHelpers} from "src/composables/useHelpers"
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

let {getDevSalary, getSaleSalary, formatMoney} = useHelpers()

var game = useGameStore();
var { shop, fetching } = storeToRefs(game);

var fetching = ref(false);
var showConfirmDev = ref(false)
var selectedDev = ref(null)

var showConfirmSale = ref(false)
var selectedSale = ref(null)

function selectDev(dev) {
  showConfirmDev.value = true
  selectedDev.value = dev
}

function selectSale(sale) {
  showConfirmSale.value = true
  selectedSale.value = sale
}

function confirmDev() {
  game.addDeveloper(selectedDev.value);
  showConfirmDev.value = false
  selectedDev.value = null;
}

function confirmSale() {
  game.addSalesman(selectedSale.value);
  showConfirmSale.value = false
  selectedSale.value = null;
}

if(!fetching.value) {
  fetching.value = true;
  game.generateShop();
  fetching.value = false;
}

</script>
<template>
  <q-page class="tw-py-8 tw-px-4">
    <h1>HR</h1>

    <q-list>
      <q-item-label header class="text-primary tw-font-bold">
        Sviluppatori sul mercato:
      </q-item-label>
      <q-item
        v-for="row in shop.developers"
        :key="row.id"
        class="q-mb-sm"
        clickable
        v-ripple
        @click="selectDev(row)"
      >
        <q-item-section avatar>
          <q-avatar
            class="tw-rounded-full tw-border tw-border-cyan-200 tw-overflow-hidden"
          >
            <img :src="row.avatar" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ row.name }}</q-item-label>
          <q-item-label caption lines="1"
            ><small>€ {{ formatMoney(getDevSalary(row)) }}/mese</small></q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-badge
            v-if="row.seniority == 1"
            color="green"
            rounded
            outline
            label="junior"
          />
          <q-badge
            v-if="row.seniority == 2"
            color="orange"
            rounded
            outline
            label="mid"
          />
          <q-badge
            v-if="row.seniority == 3"
            color="red"
            rounded
            outline
            label="senior"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-list>
      <q-item-label header class="text-primary tw-font-bold">
        Commerciali sul mercato:
      </q-item-label>
      <q-item
        v-for="row in shop.salesmen"
        :key="row.id"
        class="q-mb-sm"
        clickable
        v-ripple
        @click="selectSale(row)"
      >
        <q-item-section avatar>
          <q-avatar
            class="tw-rounded-full tw-border tw-border-cyan-200 tw-overflow-hidden"
          >
            <img :src="row.avatar" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ row.name }}</q-item-label>
          <q-item-label caption lines="1"
            ><small>€ {{ formatMoney(getSaleSalary(row)) }}/mese</small></q-item-label
          >
        </q-item-section>
        <q-item-section side>
          <q-badge
            v-if="row.experience == 1"
            color="green"
            rounded
            outline
            label="junior"
          />
          <q-badge
            v-if="row.experience == 2"
            color="orange"
            rounded
            outline
            label="mid"
          />
          <q-badge
            v-if="row.experience == 3"
            color="red"
            rounded
            outline
            label="senior"
          />
        </q-item-section>
      </q-item>
    </q-list>
    
    <q-dialog v-model="showConfirmDev" persistent>
      <q-card>
        <q-card-section class="tw-text-center">
          <q-avatar
            class="tw-rounded-full tw-border-2 tw-border-cyan-200 tw-overflow-hidden"
          >
            <img :src="selectedDev.avatar" />
          </q-avatar>
          <br />
          <strong>{{ selectedDev.name }}</strong>
          <br />
          <small>€ {{ formatMoney(getDevSalary(selectedDev)) }}/mese</small>
        </q-card-section>
        <q-card-section>
          <span class="tw-text-left">
            Vuoi aggiungerlo alla tua scuderia?
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annulla" color="gray" v-close-popup />
          <q-btn flat label="Confermo" color="primary" @click="confirmDev()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showConfirmSale" persistent>
      <q-card>
        <q-card-section class="tw-text-center">
          <q-avatar
            class="tw-rounded-full tw-border-2 tw-border-cyan-200 tw-overflow-hidden"
          >
            <img :src="selectedSale.avatar" />
          </q-avatar>
          <br />
          <strong>{{ selectedSale.name }}</strong>
          <br />
          <small>€ {{ formatMoney(getSaleSalary(selectedSale)) }}/mese</small>
        </q-card-section>
        <q-card-section>
          <span class="tw-text-left">
            Vuoi aggiungerlo alla tua scuderia?
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annulla" color="gray" v-close-popup />
          <q-btn flat label="Confermo" color="primary" @click="confirmSale()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    
  </q-page>
</template>
<style lang="scss" scoped>
h1 {
  color: $primary;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid $primary;
  line-height: normal;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}
</style>