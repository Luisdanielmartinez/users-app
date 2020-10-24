<template>
  <v-app>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="blue"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <div>
      <ToolBar
        v-show="
          $route.path === '/' || $route.path === '/register' ? false : true
        "
      />
    </div>
    <v-container fluid fill-height>
      <router-view
        v-on:show-snackbar="showSnackbar"
        @showOverlay="showOverlay"
        @hideOverlay="hideOverlay"
      />
    </v-container>
    <v-snackbar v-model="snackbar.visible" :timeout="5000">
      {{ snackbar.text }}
      <v-btn @click="snackbar.visible = false" color="teal" text>Cerrar</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import ToolBar from "./components/toolbar/toolbar";
import { getDataLocalStorage } from "./utils/constains";
import router from "./router/index";
export default {
  name: "App",

  components: {
    ToolBar,
  },

  data: () => ({
    overlay: false,
    snackbar: {
      visible: false,
      text: "",
    },
  }),
  created() {
    this.validationSession();
  },
  methods: {
    showSnackbar(message) {
      this.snackbar.visible = true;
      this.snackbar.text = message;
    },
    validationSession() {
      const isLogin = getDataLocalStorage("token");
      if (isLogin) {
        router.replace({ name: "user" }).catch((err) => {});
        return;
      }
    },
    showOverlay(overlay) {
      this.overlay = overlay;
    },
    hideOverlay(overlay) {
      this.overlay = overlay;
    },
  },
};
</script>
