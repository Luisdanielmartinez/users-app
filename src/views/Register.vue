<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="10" lg="12">
        <div class="layout column align-center">
          <v-card width="400px" class="pa-3">
            <v-btn icon text color="blue" to="/">
              <v-icon>keyboard_backspace</v-icon>
            </v-btn>
            <v-card-title>Registro</v-card-title>
            <v-card-text>
              <div class="layout column align-center">
                <i class="flex my-4 black--text"
                  >Favor llenar los campos con la informacion requerida</i
                >
              </div>
              <v-form v-model="valid">
                <v-text-field
                  color="#F28122"
                  name="nombre"
                  label="Nombre"
                  type="text"
                  v-model="user.firstname"
                  :error="error"
                  :rules="[rules.required]"
                />
                <v-text-field
                  color="#F28122"
                  name="apellido"
                  label="Apellido"
                  type="text"
                  v-model="user.lastname"
                  :error="error"
                  :rules="[rules.required]"
                />
                <v-text-field
                  color="#F28122"
                  name="login"
                  label="Direccion de correo"
                  type="text"
                  v-model="user.email"
                  :error="error"
                  :rules="emailRules"
                />

                <v-text-field
                  color="#F28122"
                  :type="hidePassword ? 'password' : 'text'"
                  :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
                  name="password"
                  label="Contraseña"
                  id="password"
                  :rules="[rules.required, rules.min]"
                  v-model="user.password"
                  :error="error"
                  @click:append="hidePassword = !hidePassword"
                />

                <v-text-field
                  color="#F28122"
                  :type="hidePassword ? 'password' : 'text'"
                  :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
                  name="verify_password"
                  label="Repite la contraseña"
                  :rules="[rules.required, rules.min]"
                  v-model="user.verify_password"
                  :error="error"
                  @click:append="hidePassword = !hidePassword"
                />
                <v-text-field
                  color="#F28122"
                  name="compañia"
                  label="Compañia"
                  type="text"
                  v-model="user.default_company"
                  :error="error"
                  :rules="[rules.required]"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                color="primary"
                :disabled="isEnabled"
                :loading="loading"
                @click="createUser"
                >Registar</v-btn
              >
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import router from "../router/index";
export default {
  name: "register",
  data() {
    return {
      valid: false,
      hidePassword: true,
      error: false,
      isEnabled: false,
      loading: false,
      emailRules: [
        (v) => !!v || "El correo es requerido",
        (v) => /.+@.+/.test(v) || "Debe ser un correo valido",
      ],
      rules: {
        required: (value) => !!value || "Campo requerido.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      user: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        verify_password: "",
        default_company: "",
      },
    };
  },
  methods: {
    ...mapActions("User", ["registerUser"]),
    async createUser() {
      if (this.valid) {
        this.$emit("showOverlay", true);
        if (this.user.password != this.user.verify_password) {
          this.$emit("show-snackbar", "Las contraseña no coinciden");
          this.$emit("hideOverlay", false);
          return;
        }
        let response = await this.registerUser({
          user: this.user,
        });
        if (!response) {
          this.$emit(
            "show-snackbar",
            "No se pudo registrar este usuario intente mas tarde."
          );
          this.$emit("hideOverlay", false);
          return;
        }
        this.$emit("show-snackbar", "Se crear el usuario exitosa mente");
        router.replace({ name: "user" }).catch((err) => {});
        this.$emit("hideOverlay", false);
      } else {
        this.$emit(
          "show-snackbar",
          "Tiene que llenar los campos correcta mente"
        );
      }
    },
  },
};
</script>
