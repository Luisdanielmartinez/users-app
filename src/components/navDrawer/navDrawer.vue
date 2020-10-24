<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ getName }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click="$route.path === item.path ? () => {} : $router.push(item.path)"
        :class="$route.path === item.path ? 'v-list-item--active' : ''"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { getDataLocalStorage } from "../../utils/constains";
export default {
  data() {
    return {
      drawer: true,
      userName: "",
      company: "",
      items: [
        { title: "Home", icon: "mdi-view-dashboard", path: "/home" },
        { title: "User", icon: "mdi-forum", path: "/user" },
      ],
    };
  },
  computed: {
    getName() {
      const name = getDataLocalStorage("firstName");
      return name;
    },
  },
  mounted() {
    this.$root.$on("toggle-drawer", () => {
      this.drawer = !this.drawer;
    });
  },
};
</script>

<style lang="css">
.subTitle {
  margin-left: 32% !important;
}
</style>
