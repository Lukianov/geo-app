<script setup lang="ts">
import { MapboxMap } from "vue-mapbox-ts";
import {onMounted, ref} from "vue";
import {MAP_SETTINGS, MY_ACCESS_TOKEN} from "@/platform/map";
import {getCurrentPosition} from "@/platform/map";

const SETTINGS = MAP_SETTINGS;

const TOKEN = MY_ACCESS_TOKEN;

const position = ref(null)

onMounted(async () => {
  position.value = await getCurrentPosition()
})
</script>

<template>
  <div>
    {{ position }}
  </div>
  <MapboxMap v-bind="SETTINGS" :access-token="TOKEN"></MapboxMap>
</template>


<style>
  .map {
    height: 90vh;
  }
</style>
