<template>
  <v-container class="profile">
    <v-subheader><strong>Our Profile</strong></v-subheader>
  
    <v-row>
      <v-col lg="6" md="6" sm="12" xs="12">
        <v-card flat>
          <v-img
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.8)"
            src="img/Ahmad.png" 
            contain
            max-height="500px"
          >
            <v-card-title>Ahmad Sopandi</v-card-title>
            <v-card-subtitle class="pb-0">D11171031</v-card-subtitle>

            <v-card-text class="text--white">
              <div>
                <strong style="font-style: italic">
                "Lahir secara normal di cimahi dengan dibantu oleh
                suster dan dokter yang sudah dibayar. 
                Anak terakhir dari 2 bersaudara. 
                Memiliki hobi yang fleksibel tergantung dengan kodisi cuaca. 
                Menempuh perkulihan di Politeknik TEDC karena tersandung oleh kata. 
                Memiliki cita-cita untuk berguna sesama makhluk tak kasat mata."
                </strong>
              </div>
            </v-card-text>
          </v-img>
        </v-card>
      </v-col>

      <v-col lg="6" md="6" sm="12" xs="12">
        <v-card flat>
          <v-img
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.8)"
            src="img/Arief.png" 
            contain
            max-height="500px"
          >
            <v-card-title >Arief Rahman Y</v-card-title>
            <v-card-subtitle class="pb-0">D11171033</v-card-subtitle>

            <v-card-text class="text--white">
              <div>
                <strong style="font-style: italic">
                "Anak ke 2 dari 3 bersaudara, yang lahir karena dipaksa untuk melihat kejamnya dunia maya. 
                Hobi mencari masalah untuk menemukan solusi–solusi tak berarti.
                Mencintai segala keindahan yang dibuat oleh yang tak kasat mata.
                Berkuliah di Politeknik TEDC Bandung lewat jalur Google Maps."
                </strong>
              </div>
            </v-card-text>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>