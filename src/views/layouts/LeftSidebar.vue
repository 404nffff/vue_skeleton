<template>
  <aside class="left-sidebar bg-base-200 p-4 min-h-screen">
    <ul class="menu p-4 w-64 bg-base-100 text-base-content rounded-lg shadow-md">
      <li v-for="route in menuRoutes" :key="route.path">
        <div v-if="!route.meta.parent" class="menu-item-container" @click="toggleMenu(route)">
          <div class="flex items-center">
            <font-awesome-icon :icon="route.meta.icon" class="mr-2" />
            <router-link 
              :to="{ name: route.name }"
              class="menu-item"
              active-class="active-link"
              exact-active-class="exact-active-link"
            >
              {{ route.meta.title }}
            </router-link>
          </div>
          <font-awesome-icon v-if="hasChildren(route)" 
            :icon="isMenuOpen(route) ? 'angle-down' : 'angle-right'" 
            class="ml-auto"
          />
        </div>
        <ul v-if="hasChildren(route) && isMenuOpen(route)" class="ml-4">
          <li v-for="child in getChildren(route)" :key="child.path">
            <router-link 
              :to="{ name: child.name }"
              class="menu-item"
              active-class="active-link"
              exact-active-class="exact-active-link"
            >
              {{ child.meta.title }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'LeftSidebar',
  components: {
    FontAwesomeIcon
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      openMenus: []
    });

    const menuRoutes = computed(() => {
      return router.options.routes
        .find(r => r.path === '/')
        .children.filter(r => r.meta && r.meta.title);
    });

    const hasChildren = (route) => {
      return menuRoutes.value.some(r => r.meta.parent === route.name);
    };

    const getChildren = (route) => {
      return menuRoutes.value.filter(r => r.meta.parent === route.name);
    };

    const toggleMenu = (route) => {
      const index = state.openMenus.indexOf(route.name);
      if (index > -1) {
        state.openMenus.splice(index, 1);
      } else {
        state.openMenus.push(route.name);
      }
    };

    const isMenuOpen = (route) => {
      return state.openMenus.includes(route.name);
    };

    return { menuRoutes, toggleMenu, isMenuOpen, hasChildren, getChildren };
  }
};
</script>

<style scoped>
.left-sidebar {
  height: 100vh;
}
.menu-item-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.menu-item {
  display: block;
  padding: 0.75rem 1rem; /* p-3 */
  border-radius: 0.375rem; /* rounded */
  transition: background-color 0.2s, color 0.2s;
}
.menu-item:hover {
  background-color: #2563eb; /* hover:bg-blue-600 */
  color: #ffffff;
}
.active-link,
.exact-active-link,
.menu-item.router-link-active {
  background-color: #2563eb; /* active:bg-blue-600 */
  color: #ffffff;
}
</style>
