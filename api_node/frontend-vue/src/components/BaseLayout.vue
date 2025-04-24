<template>
    <div>
      <!-- MENU -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Imobiliária Updev - Api Node/Vue</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link class="nav-link active" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/lista">Imóveis</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin">Admin</router-link>
              </li>
            </ul>
            <button v-if="adminLogado" class="btn btn-outline-danger" @click="logout">Sair</button>

          </div>
        </div>
      </nav>
  
      <!-- CONTEÚDO -->
      <div class="container mt-4">
        <router-view></router-view> <!-- Aqui é onde as rotas serão renderizadas -->
      </div>
  
      <!-- RODAPÉ -->
      <footer class="bg-light py-4 text-center">
        <p>&copy; 2025 Imobiliária Updev | Todos os direitos reservados</p>
        <p>Email: contato@Updev.com.br | Telefone: (67) 98162-5165</p>
      </footer>
    </div>
  </template>
  <script>
  export default {
    name: 'BaseLayout',
    data() {
      return {
        adminLogado: localStorage.getItem('adminLogado') === 'true'
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('adminLogado');
        this.adminLogado = false;
        this.$router.push('/admin');
      }
    }
  }
  </script>
  <style scoped>
  /* Personalizações de estilo, se necessário */
  footer {
    background-color: #f8f9fa;
    padding: 20px 0;
    text-align: center;
  }
  </style>
  