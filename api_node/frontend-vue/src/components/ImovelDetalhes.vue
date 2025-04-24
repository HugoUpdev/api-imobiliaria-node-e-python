<template>
    <div class="container mt-4">
      <h2>Detalhes do Imóvel</h2>
      <div v-if="imovel" class="card mt-3">
        <div class="card-body">
            <div>
                <img src="https://picsum.photos/600/400" class="img-fluid rounded shadow" alt="Imagem do imóvel">
            </div>
            <div>
                <h5 class="card-title">{{ imovel.titulo }}</h5>

                <p class="card-text">{{ imovel.descricao }}</p>
                <p><strong>Preço:</strong> R$ {{ imovel.preco.toLocaleString() }}</p>
                <p><strong>Endereço:</strong> {{ imovel.endereco }}, {{ imovel.numero }}</p>
                <p><strong>Bairro:</strong> {{ imovel.bairro }}</p>
                <p><strong>Cidade:</strong> {{ imovel.cidade }} - {{ imovel.uf }}</p>
                <p><strong>CEP:</strong> {{ imovel.cep }}</p>
            </div>
            <div class="mt-3">
                <router-link to="/lista" class="btn btn-secondary">Voltar para a lista</router-link>
            </div>
        </div>
      </div>
      <div v-else>
        <p>Carregando detalhes...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'ImovelDetalhes',
    data() {
      return {
        imovel: null,
      };
    },
    async created() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`http://144.22.192.52:3000/imoveis/${id}`);
        this.imovel = response.data;
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
      }
    }
  };
  </script>
  