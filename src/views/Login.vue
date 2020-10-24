<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4" lg="4">
        <div class="layout column align-center">
          <v-card width="400px" class="pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <h1 class="flex my-4 black--text">Iniciar Sesión</h1>
              </div>
              <v-form v-model="valid">
                <v-text-field
                  color="#F28122"
                  prepend-icon="email"
                  name="login"
                  label="Dirección de correo"
                  type="text"
                  v-model="user.email"
                  :error="error"
                  :rules="emailRules"
                />
                <v-text-field
                  color="#F28122"
                  :type="hidePassword ? 'password' : 'text'"
                  :prepend-icon="hidePassword ? 'visibility_off' : 'visibility'"
                  name="password"
                  label="Contraseña"
                  id="password"
                  :rules="[rules.required]"
                  v-model="user.password"
                  :error="error"
                  @click:append="hidePassword = !hidePassword"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                @click="loginUser()"
                dark
                color="blue"
                :loading="loading"
                >Entrar</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-card width="400px" class="my-3" flat>
            <v-card-actions>
              <div class="layout column align-center">
                <v-btn text block color="primary" to="/register"
                  >Crea una cuenta</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "../router/index";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      show1: false,
      user: {
        password: "",
        email: "",
      },
      overlay: false,
      loading: false,
      hidePassword: true,
      error: false,
      emailRules: [
        (v) => !!v || "El correo es requerido",
        (v) => /.+@.+/.test(v) || "Debe ser un correo valido",
      ],
      rules: {
        required: (value) => !!value || "Campo requerido.",
        email: "",
      },
      valid: false,
    };
  },
  methods: {
    ...mapActions("User", ["login"]),
    async loginUser() {
      if (this.valid) {
        this.loading = true;

        let response = await this.login({
          user: this.user,
        });
        if (!response) {
          this.$emit(
            "show-snackbar",
            "La contraseña o usuario esta incorrecto."
          );
          this.loading = false;
          return;
        }

        router.replace({ name: "user" }).catch((err) => {});
        this.loading = false;
      }
    },
  },
};
</script>
