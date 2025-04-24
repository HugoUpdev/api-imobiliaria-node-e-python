<template>
  <div class="container">
    <h2>Lista de Imóveis</h2>
    <!-- Filtros -->
    <div class="mb-3 bg-light p-3 rounded">
      <div class="row">
        <div class="col-md-6 mb-2">
          <input v-model="filtros.cidade" @input="buscarImoveis" class="form-control" type="text" placeholder="Filtrar por cidade" />
        </div>
        <div class="col-md-6 mb-2">
          <input v-model="filtros.titulo" @input="buscarImoveis" class="form-control" type="text" placeholder="Filtrar por título" />
        </div>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger">
      Erro ao carregar os imóveis.
    </div>

    <div v-else>
      <div class="row">
        <div v-for="imovel in imoveis" :key="imovel.id" class="card mb-3 col-md-5 m-3">
          <div class="card-body">
            <h5 class="card-title">{{ imovel.titulo }}</h5>
            <p class="card-text">{{ imovel.descricao }}</p>
            <p><strong>Preço:</strong> R$ {{ imovel.preco }}</p>
            <p><strong>Endereço:</strong> {{ imovel.endereco }}, {{ imovel.numero }} - {{ imovel.bairro }}</p>
            <p><strong>Cidade:</strong> {{ imovel.cidade }}/{{ imovel.uf }}</p>
            <router-link :to="`/detalhe/${imovel.id}`" class="btn btn-primary mt-2">Ver Detalhes</router-link>
          </div>
        </div>
      </div>

      <!-- Paginação -->
      <div v-if="total > limite" class="mt-4 d-flex justify-content-center align-items-center">
        <button @click="paginaAnterior" :disabled="paginaAtual === 1" class="btn btn-secondary mx-2">
          Anterior
        </button>
        <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
        <button @click="proximaPagina" :disabled="paginaAtual === totalPaginas" class="btn btn-secondary mx-2">
          Próxima
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      imoveis: [],
      error: false,
      filtros: {
        cidade: '',
        titulo: ''
      },
      paginaAtual: 1,
      limite: 4,
      total: 0
    };
  },
  created() {
    this.fetchImoveis();
  },
  methods: {
    async fetchImoveis() {
      try {
        console.log(`Buscando imóveis na página ${this.paginaAtual} com limite ${this.limite}`); // Adicionado para debugar
        const response = await axios.get('http://144.22.192.52:3000/imoveis', {
          params: {
            pagina: this.paginaAtual,
            limite: this.limite,
            cidade: this.filtros.cidade,
            titulo: this.filtros.titulo
          }
        });
        console.log('Imóveis retornados:', response.data); // Verificar o que veio na resposta
        this.imoveis = response.data.imoveis;
        this.total = response.data.total;
      } catch (error) {
        console.error("Erro ao carregar imóveis:", error);
        this.error = true;
      }
    },
    paginaAnterior() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
        this.fetchImoveis();
      }
    },
    proximaPagina() {
      const totalPaginas = Math.ceil(this.total / this.limite);
      if (this.paginaAtual < totalPaginas) {
        this.paginaAtual++;
        this.fetchImoveis();
      }
    },
    // Método para chamar a fetchImoveis novamente quando o filtro for alterado
    buscarImoveis() {
      this.paginaAtual = 1;  // Resetar para a primeira página sempre que o filtro mudar
      this.fetchImoveis();
    }
  },
  computed: {
    totalPaginas() {
      return Math.ceil(this.total / this.limite);
    }
  }
};
</script>
