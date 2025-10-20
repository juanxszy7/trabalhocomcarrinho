<template>
  <div class="editar-usuario">
    <h2>Editar Usuário</h2>

    <form @submit.prevent="atualizarUsuario">
      <div>
        <label>Nome:</label>
        <input type="text" v-model="nome" />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" v-model="email" />
      </div>

      <div>
        <label>Senha (opcional):</label>
        <input type="password" v-model="senha" />
      </div>

      <button type="submit">Salvar Alterações</button>
    </form>

    <p v-if="mensagem">{{ mensagem }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      nome: "",
      email: "",
      senha: "",
      mensagem: ""
    };
  },
  async mounted() {
    await this.buscarUsuario();
  },
  methods: {
    async buscarUsuario() {
      try {
        const res = await axios.get(`http://localhost:3000/dashboard/${this.id}`);
        this.nome = res.data.nome;
        this.email = res.data.email;
      } catch (error) {
        this.mensagem = "Erro ao carregar os dados do usuário.";
      }
    },
    async atualizarUsuario() {
      try {
        const body = {
          id: this.id,
          nome: this.nome,
          email: this.email,
          senha: this.senha
        };
        const res = await axios.put(`http://localhost:3000/dashboard/${this.id}`, body);
        this.mensagem = res.data.message || "Usuário atualizado com sucesso!";
      } catch (error) {
        this.mensagem = "Erro ao atualizar o usuário.";
      }
    }
  }
};
</script>

<style scoped>
.editar-usuario {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  background: #1a237e; /* cor principal */
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(26, 35, 126, 0.3); /* card flutuante */
  color: #ffffff; /* texto branco */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.editar-usuario:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 40px rgba(26, 35, 126, 0.4);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 28px;
  color: #eceff1; /* cor secundária */
  font-weight: 700;
}

label {
  display: block;
  margin-top: 15px;
  font-weight: 600;
  color: #eceff1; /* cor secundária */
}

input {
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border: 1px solid #eceff1; /* borda cinza clara */
  border-radius: 10px;
  font-size: 15px;
  background: #1a237e; /* fundo do input combina com card */
  color: #ffffff;
  transition: border-color 0.3s, background 0.3s;
}

input::placeholder {
  color: #c5cae9; /* placeholder suave */
}

input:focus {
  outline: none;
  border-color: #c5cae9;
  background: #283593; /* leve destaque ao focar */
  box-shadow: 0 0 8px rgba(197, 202, 233, 0.5);
}

button {
  margin-top: 25px;
  padding: 12px;
  width: 100%;
  background: #283593; /* tom secundário de azul */
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

button:hover {
  background: #3949ab;
  transform: translateY(-2px);
}

p {
  margin-top: 20px;
  text-align: center;
  color: #c5cae9; /* mensagem suave */
  font-weight: 500;
}
</style>

