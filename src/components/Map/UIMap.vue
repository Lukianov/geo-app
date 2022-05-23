<script setup lang="ts">
import { MapboxMap, MapboxMarker, MapboxGeogeometryCircle } from "vue-mapbox-ts";
import {onMounted, ref, watch} from "vue";
import {MAP_SETTINGS, MY_ACCESS_TOKEN, CIRCLE_DIAMETER} from "@/platform/map";

import {getCurrentPosition} from "@/platform/map";

import {watchUserPosition} from "../../platform/map";

const SETTINGS = MAP_SETTINGS;

const TOKEN = MY_ACCESS_TOKEN;

const position = ref<null | number[]>(null)

const watcherId = ref<null | number>(null)

const isShowSheet = ref(false)

onMounted(() => {
  const targetPosition = {lat: MAP_SETTINGS.center[1], lng: MAP_SETTINGS.center[0]}

  watchUserPosition({position, targetPosition, circleDiameter: CIRCLE_DIAMETER})
})

watch(() => position.value, newPosition => {
  console.warn('Position changed')
})
</script>

<template>
  <mapbox-map v-bind="SETTINGS" :access-token="TOKEN">
    <mapbox-marker v-if="position" :lngLat="position" color="#E88181" />
    <mapbox-marker :lngLat="SETTINGS.center" />
    <mapbox-geogeometry-circle
        :center="SETTINGS.center"
        :radius="CIRCLE_DIAMETER"
    />
  </mapbox-map>
<!--  <v-btn-->
<!--      color="blue"-->
<!--      dark-->
<!--      @click="isShowSheet = !isShowSheet"-->
<!--  >-->
<!--    Open sheet-->
<!--  </v-btn>-->
<!--  <v-bottom-sheet v-model="isShowSheet">-->
<!--    <v-sheet-->
<!--        class="text-center"-->
<!--        height="200px"-->
<!--    >-->
<!--      <v-btn-->
<!--          class="mt-6"-->
<!--          text-->
<!--          color="red"-->
<!--          @click="isShowSheet = !isShowSheet"-->
<!--      >-->
<!--        close-->
<!--      </v-btn>-->
<!--    </v-sheet>-->
<!--  </v-bottom-sheet>-->
</template>


<style>
  .map {
    height: 90vh;
  }
</style>
