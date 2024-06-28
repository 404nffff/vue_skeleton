<template>
  <header class="header bg-base-200">
    <nav class="navbar bg-base-200 p-3 shadow-md rounded-lg flex justify-between items-center text-white">
      <div class="flex items-center space-x-4">
        <a class="btn btn-ghost normal-case text-xl text-white" @click="$router.push('/')">Admin Dashboard</a>
      </div>
      <div class="relative flex items-center space-x-4">
        
        <div class="avatar" @click="toggleMenu">
          <div class="w-24 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <span @click="toggleMenu">{{ username }}</span>
        <div v-if="menuOpen" class="menu absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="$router.push('/profile')">Profile</li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="$router.push('/settings')">Settings</li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="logout">Logout</li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    username() {
      return this.$store.getters.username || 'User'; // 从 Vuex 获取用户名，默认值为 'User'
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
      this.menuOpen = false;
    }
  }
};
</script>

<style scoped>
.header {
  padding: 0.5rem; /* p-4 */
  background: #f4f5fa;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #111827; /* 更深的背景 */
  padding: 1rem; /* p-4 */
  border-radius: 0.375rem; /* rounded */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* shadow */
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.menu {
  top: 100%; /* 确保菜单在头像下方 */
  right: 0; /* 菜单右对齐 */
  background-color: white;
  border: 1px solid #e5e7eb; /* Border color */
  border-radius: 0.5rem; /* Rounded corners */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Shadow for the menu */
  z-index: 1000; /* 确保菜单显示在顶部 */
  color: #111827; /* Text color */
}
.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu li {
  padding: 0.5rem 1rem; /* px-4 py-2 */
  cursor: pointer;
}
.menu li:hover {
  background-color: #f3f4f6; /* hover:bg-gray-100 */
}


</style>
