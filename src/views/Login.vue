<template>
  <div class="login">
    <div class="login-container">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            v-model="username"
            id="username"
            name="username"
            type="text"
            required
            class="input input-bordered w-full mt-1"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            required
            class="input input-bordered w-full mt-1"
            placeholder="Enter your password"
          />
        </div>
        <div>
          <button type="submit" class="btn btn-primary w-full">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '../api/login';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await login(this.username, this.password);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6; /* bg-gray-100 */
}

.login-container {
  max-width: 400px;
  width: 100%;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
