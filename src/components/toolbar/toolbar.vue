<template>
  <v-container>
    <NavDrawer />
    <v-app-bar app color="blue" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        <span class="title">App User</span>
      </div>
      <v-spacer></v-spacer>

      <v-btn text @click="singOutUser()">
        <span class="mr-2">Salir</span>
        <v-icon right>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import NavDrawer from "../navDrawer/navDrawer";
export default {
  components: {
    NavDrawer,
  },
  data: () => ({
    drawer: false,
  }),

  methods: {
    ...mapActions("User", ["singOut"]),
    toggleDrawer() {
      this.$root.$emit("toggle-drawer");
    },
    async singOutUser() {
      this.$emit("authenticated", false);
      await this.singOut();
    },
  },
};
</script>
