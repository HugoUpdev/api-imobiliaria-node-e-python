<template>
  <div class="container mt-5">
    <h1 class="mb-4">{{ isEdit ? 'Editar Imóvel' : 'Novo Imóvel' }}</h1>

    <form @submit.prevent="salvarImovel">
      <div class="row">

      <div class="mb-3 col-md-6">
        <label class="form-label">Título</label>
        <input type="text" class="form-control" v-model="imovel.titulo" required>
      </div>

      <div class="mb-3 col-md-6">
        <label class="form-label">Preço</label>
        <input type="number" step="0.01" class="form-control" v-model="imovel.preco">
      </div>

      <div class="mb-3 col-md-12">
        <label class="form-label">Descrição</label>
        <textarea class="form-control" v-model="imovel.descricao" required></textarea>
      </div>

      <div class="mb-3 col-md-3">
          <label class="form-label">CEP</label>
          <input 
            type="text" 
            class="form-control" 
            id="cep" 
            name="cep"
            placeholder="00000-000" 
            required
            v-model="imovel.cep"
            @input="formatarCep"
            @blur="buscarEnderecoPorCep"
          />
        </div> 
        
      <div class="mb-3 col-md-6">
        <label class="form-label">Endereço</label>
        <input type="text" class="form-control" v-model="imovel.endereco" required>
      </div>

        <div class=" mb-3 col-md-3">
          <label class="form-label">Número</label>
          <input type="text" class="form-control" v-model="imovel.numero">
        </div>
        <div class="mb-3 col-md-5">
          <label class="form-label">Bairro</label>
          <input type="text" class="form-control" v-model="imovel.bairro">
        </div> 
        <div class="col-md-5 mb-3">
          <label class="form-label">Cidade</label>
          <input type="text" class="form-control" v-model="imovel.cidade">
        </div>
        <div class="col-md-2 mb-3">
          <label class="form-label">UF</label>
          <input 
            type="text" 
            class="form-control" 
            v-model="imovel.uf" 
            @input="formatarUF"
          />
        </div>
      </div>

      <button type="submit" class="btn btn-success">{{ isEdit ? 'Atualizar' : 'Salvar' }}</button>
      <router-link to="/listaadmin" class="btn btn-secondary ms-2">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'], // Recebe o id da rota se vier
   
  data() {
    return {
      imovel: {
        titulo: '',
        descricao: '',
        preco: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: ''
      },
      isEdit: false
    };
  },
  mounted() {
    if (this.id) {
      this.isEdit = true;
      this.carregarImovel();
    }
  },
  methods: {
    
    formatarUF() {
      this.imovel.uf = this.imovel.uf.toUpperCase(); // Garantir que o UF seja sempre maiúsculo
    },

    formatarCep() {
      let cep = this.imovel.cep.replace(/\D/g, ''); // remove tudo que não é número
      
      if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5, 8);
      }
      
      this.imovel.cep = cep.slice(0, 9); // garante que não ultrapasse o tamanho "00000-000"
    },

    async buscarEnderecoPorCep() {
      const cep = this.imovel.cep.replace(/\D/g, ''); // tira caracteres não numéricos

      if (cep.length !== 8) {
        alert('CEP inválido.');
        return;
      }

      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
          alert('CEP não encontrado.');
        } else {
          this.imovel.endereco = response.data.logradouro;
          this.imovel.bairro = response.data.bairro;
          this.imovel.cidade = response.data.localidade;
          this.imovel.uf = response.data.uf.toUpperCase();
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        alert('Erro ao buscar o CEP.');
      }
    },

    async carregarImovel() {
      try {
        const response = await axios.get(`http://144.22.192.52:3000/imoveis/${this.id}`);
        this.imovel = response.data;
      } catch (error) {
        console.error('Erro ao carregar imóvel:', error);
        alert('Erro ao carregar imóvel.');
      }
    },
    async salvarImovel() {
      try {
        if (this.isEdit) {
          // Atualizar imóvel
          await axios.put(`http://144.22.192.52:3000/imoveis/${this.id}`, this.imovel);
          alert('Imóvel atualizado com sucesso!');
        } else {
          // Criar novo imóvel
          await axios.post('http://144.22.192.52:3000/imoveis', this.imovel);
          alert('Imóvel cadastrado com sucesso!');
        }
        this.$router.push('/listaadmin');
      } catch (error) {
        console.error('Erro ao salvar imóvel:', error);
        alert('Erro ao salvar imóvel.');
      }
    }
  }
};
</script>

<style scoped>
/* Opcional: estilizações específicas */
</style>
