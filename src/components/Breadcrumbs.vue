<template>
  <div class="bg-white p-2">
    <div class="text-sm breadcrumbs p-2  rounded-lg">
      <ul>
        <li v-for="(crumb, index) in breadcrumbs" :key="index">
          <template v-if="index === 0">
            <span>{{ crumb.meta.title }}</span>
          </template>
          <template v-else-if="index === breadcrumbs.length - 1">
            <span>{{ crumb.meta.title }}</span>
          </template>
          <template v-else>
            
            <router-link v-if="crumb.meta.parent" :to="{ name: crumb.name }">
              {{ crumb.meta.title }}
            </router-link>
            <span v-else>{{ crumb.meta.title }}</span>
          </template>
        </li>
      </ul>
    </div>
  </div>
  
</template>

<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'Breadcrumbs',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const findParentRoute = (parentName, routes) => {
      for (const route of routes) {
        if (route.name === parentName) {
          return route;
        }
        if (route.children) {
          const childRoute = findParentRoute(parentName, route.children);
          if (childRoute) {
            return childRoute;
          }
        }
      }
      return null;
    };

    const breadcrumbs = computed(() => {
      const matchedRoutes = route.matched.filter(r => r.meta && r.meta.title);
      const breadcrumbsArray = [];

      matchedRoutes.forEach((matchedRoute) => {
        let currentRoute = matchedRoute;
        while (currentRoute) {
          breadcrumbsArray.unshift(currentRoute);
          if (currentRoute.meta && currentRoute.meta.parent) {
            currentRoute = findParentRoute(currentRoute.meta.parent, router.options.routes);
          } else {
            break;
          }
        }
      });

      return breadcrumbsArray;
    });

    return { breadcrumbs };
  }
};
</script>

<style scoped>
.breadcrumbs {
}
.breadcrumbs ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}
.breadcrumbs li {
  display: flex;
  align-items: center;
}
.breadcrumbs a {
  color: #2563eb; /* text-blue-600 */
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumbs a:hover {
  color: #1e40af; /* hover:text-blue-800 */
}
.breadcrumbs span {
  font-weight: bold;
}
.breadcrumb-separator {
  margin: 0 0.5rem;
}
</style>
