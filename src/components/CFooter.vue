<template>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="white text-center"
    >
      <v-card-text>
        <v-btn
          v-for="link in links"
          :to="link"
          :key="link"
          color="white darken-3"
          text
          rounded
          class="my-2 capitalize"
        >
          {{ link }}
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Project UAS Technology WEB 2.0 
        <br>
        <strong>Ahmad Sopandi</strong> & <strong>Arief Rahman Y</strong>
        <br>
        RPL — A 2017
        <!-- Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. -->
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        <strong>Technology WEB 2.0</strong> — {{ new Date().getFullYear() }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>


<script>
  export default {
    data: () => ({
      links: [
        'home',
        'categories',
        'products',
        'about',
      ],
    }),
  }
</script>