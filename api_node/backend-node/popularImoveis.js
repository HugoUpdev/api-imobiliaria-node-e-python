const { criarImovelDireto } = require('./controllers/imoveisController');

async function popularImoveis() {
  const imoveis = [
    { titulo: 'Casa no Jardim América', descricao: 'Casa espaçosa com 3 quartos.', preco: 350000, endereco: 'Rua das Flores', numero: '123', bairro: 'Jardim América', cidade: 'Campo Grande', uf: 'MS', cep: '79050-000' },
    { titulo: 'Apartamento no Centro', descricao: 'Apartamento moderno no centro.', preco: 280000, endereco: 'Avenida Afonso Pena', numero: '456', bairro: 'Centro', cidade: 'Campo Grande', uf: 'MS', cep: '79002-000' },
    { titulo: 'Chácara em Terenos', descricao: 'Chácara ampla com pomar.', preco: 500000, endereco: 'Estrada Velha', numero: '789', bairro: 'Zona Rural', cidade: 'Terenos', uf: 'MS', cep: '79190-000' },
    { titulo: 'Sobrado no Bairro São Francisco', descricao: 'Sobrado com área gourmet.', preco: 420000, endereco: 'Rua São João', numero: '321', bairro: 'São Francisco', cidade: 'Campo Grande', uf: 'MS', cep: '79060-000' },
    { titulo: 'Kitnet no Bairro Universitário', descricao: 'Kitnet ideal para estudantes.', preco: 95000, endereco: 'Rua das Acácias', numero: '654', bairro: 'Universitário', cidade: 'Campo Grande', uf: 'MS', cep: '79070-000' },
    { titulo: 'Apartamento Garden', descricao: 'Apartamento térreo com jardim.', preco: 320000, endereco: 'Rua Ipê Roxo', numero: '100', bairro: 'Chácara Cachoeira', cidade: 'Campo Grande', uf: 'MS', cep: '79040-000' },
    { titulo: 'Casa com Piscina', descricao: 'Casa 4 quartos com piscina.', preco: 600000, endereco: 'Rua Amazonas', numero: '222', bairro: 'Vila Planalto', cidade: 'Campo Grande', uf: 'MS', cep: '79009-000' },
    { titulo: 'Terreno no Damha', descricao: 'Terreno residencial em condomínio.', preco: 250000, endereco: 'Alameda dos Flamboyants', numero: '999', bairro: 'Residencial Damha', cidade: 'Campo Grande', uf: 'MS', cep: '79031-000' },
    { titulo: 'Casa no Bairro Rita Vieira', descricao: 'Casa 3 quartos nova.', preco: 370000, endereco: 'Rua Rio Verde', numero: '303', bairro: 'Rita Vieira', cidade: 'Campo Grande', uf: 'MS', cep: '79052-000' },
    { titulo: 'Apartamento no Bairro Monte Castelo', descricao: 'Apartamento em excelente localização.', preco: 310000, endereco: 'Rua Pedro Celestino', numero: '404', bairro: 'Monte Castelo', cidade: 'Campo Grande', uf: 'MS', cep: '79010-000' },
    { titulo: 'Casa Geminada', descricao: 'Casa compacta e moderna.', preco: 220000, endereco: 'Rua das Palmeiras', numero: '505', bairro: 'Parati', cidade: 'Campo Grande', uf: 'MS', cep: '79082-000' },
    { titulo: 'Cobertura Duplex', descricao: 'Cobertura com vista panorâmica.', preco: 750000, endereco: 'Rua Rio Negro', numero: '606', bairro: 'Jardim dos Estados', cidade: 'Campo Grande', uf: 'MS', cep: '79020-000' },
    { titulo: 'Sítio em Sidrolândia', descricao: 'Sítio com nascente e pasto.', preco: 650000, endereco: 'Estrada Sidrolândia', numero: '707', bairro: 'Zona Rural', cidade: 'Sidrolândia', uf: 'MS', cep: '79170-000' },
    { titulo: 'Apartamento no Bairro Coophavila II', descricao: 'Apartamento reformado.', preco: 270000, endereco: 'Rua Panambi Vera', numero: '808', bairro: 'Coophavila II', cidade: 'Campo Grande', uf: 'MS', cep: '79073-000' },
    { titulo: 'Casa com Quintal Grande', descricao: 'Casa térrea com quintal.', preco: 390000, endereco: 'Rua das Mangueiras', numero: '909', bairro: 'Portal Caiobá', cidade: 'Campo Grande', uf: 'MS', cep: '79074-000' },
    { titulo: 'Apartamento no Bairro Tiradentes', descricao: '2 quartos com lazer completo.', preco: 295000, endereco: 'Rua Marquês de Herval', numero: '111', bairro: 'Tiradentes', cidade: 'Campo Grande', uf: 'MS', cep: '79041-000' },
    { titulo: 'Casa no Bairro Guanandi', descricao: 'Casa com suíte e closet.', preco: 360000, endereco: 'Rua Jaguariúna', numero: '212', bairro: 'Guanandi', cidade: 'Campo Grande', uf: 'MS', cep: '79086-000' },
    { titulo: 'Apartamento no Bairro Pioneiros', descricao: 'Apartamento com sacada.', preco: 305000, endereco: 'Rua Francisco dos Anjos', numero: '313', bairro: 'Pioneiros', cidade: 'Campo Grande', uf: 'MS', cep: '79094-000' },
    { titulo: 'Casa Nova no Bairro Centenário', descricao: 'Casa 2 quartos pronta.', preco: 280000, endereco: 'Rua América do Sul', numero: '414', bairro: 'Centenário', cidade: 'Campo Grande', uf: 'MS', cep: '79106-000' },
    { titulo: 'Apartamento no Parque Residencial Rita Vieira', descricao: 'Apto novo pronto para morar.', preco: 330000, endereco: 'Rua Ovídio Serra', numero: '515', bairro: 'Rita Vieira', cidade: 'Campo Grande', uf: 'MS', cep: '79052-120' },
  ];

  for (const imovel of imoveis) {
    try {
      const result = await criarImovelDireto(imovel);
      console.log(`✅ ${imovel.titulo} cadastrado com sucesso! ID: ${result.id}`);
    } catch (error) {
      console.error(`❌ Erro ao cadastrar ${imovel.titulo}: ${error.message}`);
    }
  }
}

popularImoveis();
