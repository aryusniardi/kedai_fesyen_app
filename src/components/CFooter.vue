<template>
  <v-footer padless color="indigo">
    <v-card flat tile>
      <v-card-text class="text-center">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text text-center">
          Project untuk memenuhi UAS mata perkuliahan Technology WEB 2.0
      </v-card-text>

      <v-card-text class="white--text text-center">
          <strong>Ahmad Sopandi & Arief Rahman Y</strong>
          <br>
        {{ new Date().getFullYear() }} 
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>