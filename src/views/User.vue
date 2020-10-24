<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" xs="6" md="10" sm="10">
        <v-card>
          <v-card-title>
            Users
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :loading="loading"
            :items="getUsers"
            :search="search"
            :items-per-page="5"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import router from "../router/index";
export default {
  data() {
    return {
      search: "",
      loading: false,
      users: [],
      headers: [
        {
          text: "Marca",
          value: "firstname",
          sortable: false,
          align: "Nombre",
        },
        { text: "Apellido", value: "lastname" },
        { text: "Email", value: "email" },
        {
          text: "Compañia",
          value: "default_company",
          align: "left",
          width: "1%",
        },
      ],
    };
  },
  mounted() {
    this.loadUser();
  },
  computed: {
    getUsers() {
      return this.users;
    },
  },
  methods: {
    ...mapActions("User", ["getUsersAction"]),
    async loadUser() {
      this.$emit("showOverlay", true);
      this.loading = true;
      const response = await this.getUsersAction();
      if (response.status == 401 || response.status == 404) {
        router.replace({ name: "login" }).catch((err) => {});
        return;
      }
      this.users = response;
      this.loading = false;
      this.$emit("hideOverlay", false);
    },
  },
};
</script>
