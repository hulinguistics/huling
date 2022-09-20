<template>
  <l-map style="height: 50vh">
    <l-geo-json :geojson="geojson" :options="geojsonOptions" />
  </l-map>
</template>

<script>
import { LMap, LGeoJson } from '@vue-leaflet/vue-leaflet';
import '../css/leaflet.css';

export default {
  components: {
    LMap,
    LGeoJson,
  },
  setup() {
    return {
      geojson: {
        type: 'FeatureCollection',
        features: [
          // ...
        ],
      },
      geojsonOptions: {
        // Options that don't rely on Leaflet methods.
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.leaflet-container {
  margin: 16px 0;
  z-index: 0;
}
</style>
