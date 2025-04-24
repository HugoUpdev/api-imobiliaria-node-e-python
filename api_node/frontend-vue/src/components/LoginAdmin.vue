<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card shadow p-4" style="width: 100%; max-width: 400px;">
      <h3 class="text-center mb-4">Login</h3>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input type="email" class="form-control" id="email" v-model="email" required>
        </div>
        <div class="mb-3">
          <label for="senha" class="form-label">Senha</label>
          <input type="password" class="form-control" id="senha" v-model="senha" required>
        </div>
        <button type="submit" class="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  </div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        senha: ''
      }
    },
    methods: {
      login() {
        // Aqui futuramente você vai validar com a API
        if (this.email === 'admin@updev.com.br' && this.senha === '123456') {
          alert('Login bem-sucedido!');
          localStorage.setItem("adminLogado", "true");
          this.$router.push('/listaadmin');
        } else {
          alert('E-mail ou senha incorretos.');
        }
      }
    }
  }
  </script>
  