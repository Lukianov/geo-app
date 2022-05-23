<template>
  <v-app>
    <v-main>
      <UIMap></UIMap>
    </v-main>
    <v-input></v-input>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UIMap from './components/Map/UIMap.vue'

export default defineComponent({
  name: 'App',

  components: {
    UIMap,
  },

  data () {
    return {
      //
    }
  },
})
</script>
