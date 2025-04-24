<template>
  <div class="container mt-5">
    <h1 class="mb-4">Imóveis Cadastrados</h1>

    <!-- Filtros -->
    <div class="d-flex justify-content-start align-items-center mb-4 bg-light p-3 rounded">
      <input v-model="filtros.titulo" @input="carregarImoveis" type="text" class="form-control" placeholder="Filtrar por título" />

      <input v-model="filtros.cidade" @input="carregarImoveis" type="text" class="form-control me-2" placeholder="Filtrar por cidade" />
    </div>

    <!-- Tabela -->
      <table class="table table-bordered table-hover bg-white">
        <thead class="table-secondary">
          <tr>
            <th @click="ordenarPor('id')">
              ID
              <span v-if="ordemCampo === 'id'">{{ ordemDirecao === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="ordenarPor('titulo')">
              Título
              <span v-if="ordemCampo === 'titulo'">{{ ordemDirecao === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="ordenarPor('endereco')">
              Endereço
              <span v-if="ordemCampo === 'endereco'">{{ ordemDirecao === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th>
              Cidade/UF
              
            </th>
            <th @click="ordenarPor('preco')">
              Preço
              <span v-if="ordemCampo === 'preco'">{{ ordemDirecao === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="imovel in imoveis" :key="imovel.id">
            <td>{{ imovel.id }}</td>
            <td>{{ imovel.titulo }}</td>
            <td>{{ imovel.endereco }}</td>
            <td>{{ imovel.cidade }}/{{ imovel.uf }}</td>
            <td>
              <span v-if="imovel.preco">{{ imovel.preco }}</span>
              <span v-else>Não informado</span>
            </td>
            <td class="d-flex gap-2">
              <router-link :to="`/editar/${imovel.id}`" class="btn btn-sm btn-primary">Editar</router-link>
              <button @click="excluirImovel(imovel.id)" class="btn btn-sm btn-danger">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Paginação -->
      <div v-if="totalPaginas > 1" class="mt-4 d-flex justify-content-center align-items-center">
        <button @click="paginaAnterior" :disabled="paginaAtual === 1" class="btn btn-secondary mx-2">
          Anterior
        </button>
        
        <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
        
        <button @click="proximaPagina" :disabled="paginaAtual === totalPaginas" class="btn btn-secondary mx-2">
          Próxima
        </button>
      </div>

      <router-link to="/novo" class="btn btn-success mt-3">Incluir Novo Imóvel</router-link>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ImovelListAdmin',
  data() {
    return {
      imoveis: [],
      filtros: {
        cidade: '',
        titulo: ''
      },
      paginaAtual: 1,
      limite: 10,
      total: 0,
      totalPaginas: 0,
      ordemCampo: 'id', // Campo atual de ordenação
      ordemDirecao: 'asc' // Direção atual de ordenação
    }
  },
  methods: {
    async carregarImoveis() {
      try {
        const response = await axios.get('http://144.22.192.52:3000/imoveis', {
          params: {
              cidade: this.filtros.cidade,
              titulo: this.filtros.titulo,
              ordemCampo: this.ordemCampo,
              ordemDirecao: this.ordemDirecao,
              pagina: this.paginaAtual,  
              limite: this.limite 
          }
        });
        console.log('Resposta da API:', response.data); // Adiciona para ver a resposta

          this.imoveis = response.data.imoveis || response.data;
          this.total = response.data.total || 0;
          this.totalPaginas = Math.ceil(this.total / this.limite);

      } catch (error) {
        console.error('Erro ao carregar imóveis:', error)
      }
    },
    async excluirImovel(id) {
      if (confirm('Tem certeza que deseja excluir este imóvel?')) {
        try {
          await axios.delete(`http://144.22.192.52:3000/imoveis/${id}`, {
            headers: {
              'x-admin-token': 'seuTokenSecreto', // Exemplo de token de autenticação
            },
          });
          this.carregarImoveis();
        } catch (error) {
          console.error('Erro ao excluir imóvel:', error)
        }
      }
    },
    ordenarPor(campo) {
      if (this.ordemCampo === campo) {
        this.ordemDirecao = this.ordemDirecao === 'asc' ? 'desc' : 'asc';
      } else {
        this.ordemCampo = campo;
        this.ordemDirecao = 'asc';
      }
      this.carregarImoveis();
    },
    buscarImoveis() {
      this.paginaAtual = 1;
      this.carregarImoveis();
    },
    paginaAnterior() {
      if (this.paginaAtual > 1) {
        this.paginaAtual--;
        this.carregarImoveis();
      }
    },
    proximaPagina() {
      if (this.paginaAtual < this.totalPaginas) {
        this.paginaAtual++;
        this.carregarImoveis();
      }
    }
  },
  computed: {
    somarPaginas() {
      return this.total > 0 ? Math.ceil(this.total / this.limite) : 1;
    }

  },
  mounted() {
    this.carregarImoveis();
  }
}
</script>