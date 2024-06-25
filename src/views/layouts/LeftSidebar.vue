<template>
  <aside class="left-sidebar bg-base-200 p-3 min-h-screen">
    <ul class="menu p-4 w-64 bg-base-100 text-base-content rounded-lg shadow-md">
      <div v-for="route in filteredRoutes" :key="route.path">
        <li v-if="hasChildren(route)">
          <details :open="isMenuOpen(route)">
            <summary :class="{ active: isActiveRoute(route) }">
              <i class="mr-2 fas " :class="'fa-'+route.meta.icon"></i>
              {{ route.meta.title }}
            </summary>
            <ul class="menu-dropdown">
              <li v-for="child in getChildren(route)" :key="child.path">
                <router-link 
                  :to="{ name: child.name }"
                  class="menu-item"
                  :class="{ active: isActiveRoute(child) }"
                >
                  {{ child.meta.title }}
                </router-link>
                <ul v-if="hasChildren(child) && isMenuOpen(child)" class="menu-dropdown pl-4">
                  <li v-for="subchild in getChildren(child)" :key="subchild.path">
                    <router-link 
                      :to="{ name: subchild.name }"
                      class="menu-item"
                      :class="{ active: isActiveRoute(subchild) }"
                    >
                      {{ subchild.meta.title }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </details>
        </li>
        <li v-else-if="!route.meta.parent">
          <router-link 
            :to="{ name: route.name }"
            class="menu-item flex items-center"
            :class="{ active: isActiveRoute(route) }"
          >
            <i class="mr-2 fas " :class="'fa-'+route.meta.icon"></i>
            {{ route.meta.title }}
          </router-link>
        </li>
      </div>
    </ul>
  </aside>
</template>

<script>
import { computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default {
  name: 'LeftSidebar',
  components: {
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      openMenus: []
    });

    const allRoutes = router.options.routes.find(r => r.path === '/').children;

    const filteredRoutes = computed(() => {
      return allRoutes.filter(r => !r.meta || r.meta.display !== 'none');
    });

    const hasChildren = (route) => {
      return filteredRoutes.value.some(r => r.meta.parent === route.name && (!r.meta.display || r.meta.display !== 'none'));
    };

    const getChildren = (route) => {
      return filteredRoutes.value.filter(r => r.meta.parent === route.name && (!r.meta.display || r.meta.display !== 'none'));
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

    const initializeMenuState = () => {
      const currentRoute = router.currentRoute.value;
      const openParentMenus = (route) => {
        if (route.meta && route.meta.parent) {
          const parentRoute = allRoutes.find(r => r.name === route.meta.parent);
          if (parentRoute) {
            if (!state.openMenus.includes(parentRoute.name)) {
              state.openMenus.push(parentRoute.name);
            }
            openParentMenus(parentRoute);
          }
        }
      };
      openParentMenus(currentRoute);
    };

    const isActiveRoute = (route) => {
      const currentRoute = router.currentRoute.value;
      if (currentRoute.name === route.name) {
        return true;
      }

      // Check if any ancestor of the current route matches the route
      let parentRoute = currentRoute;
      while (parentRoute) {
        if (parentRoute.name === route.name) {
          return true;
        }
        parentRoute = allRoutes.find(r => r.name === parentRoute.meta?.parent);
      }
      return false;
    };

    onMounted(() => {
      initializeMenuState();
    });

    return { filteredRoutes, toggleMenu, isMenuOpen, hasChildren, getChildren, isActiveRoute };
  }
};
</script>

<style scoped>
.left-sidebar {
  height: 100vh;
  background: #f4f5fa;
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
  margin-bottom: 0.5rem;
}

.menu-dropdown {
  list-style-type: none;
  padding-left: 1rem;
}
.menu-dropdown-show {
  display: block;
}

summary {
  cursor: pointer;
  list-style-type: none;
  padding: 0.75rem 1rem; /* p-3 */
  border-radius: 0.375rem; /* rounded */
  transition: background-color 0.2s, color 0.2s;
}
</style>
