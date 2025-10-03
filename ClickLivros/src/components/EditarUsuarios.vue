<template>
  <div class="editar-page">
    <div class="overlay"></div>

    <div class="editar-card">
      <h1>Editar Usuário</h1>
      <form @submit.prevent="atualizarUsuario">
        <div class="form-group">
          <label>Nome</label>
          <input v-model="form.nome" type="text" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" required />
        </div>
        <div class="form-group">
          <label>Idade</label>
          <input v-model.number="form.idade" type="number" />
        </div>
        <div class="acoes-formulario">
          <button type="submit" class="salvar">Salvar</button>
          <button type="button" class="cancelar" @click="cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditarUsuario",
  data() {
    return {
      form: { _id: "", nome: "", email: "", idade: null },
    };
  },
  mounted() {
    // Pegando o ID da rota
    const id = this.$route.params.id;

    if (!id) {
      alert("ID do usuário não fornecido!");
      this.$router.push("/dashboard");
      return;
    }

    // Carregar dados do usuário
    this.carregarUsuario(id);
  },
  methods: {
    async carregarUsuario(id) {
      try {
        const res = await axios.get(`http://localhost:3000/dashboard/${id}`);
        // Preenche o formulário com os dados do backend
        this.form = { ...res.data };
      } catch (e) {
        console.error("Erro ao carregar usuário:", e);
        alert("Usuário não encontrado!");
        this.$router.push("/dashboard");
      }
    },
    async atualizarUsuario() {
      try {
        await axios.put(`http://localhost:3000/dashboard/${this.form._id}`, this.form);
        alert("Usuário atualizado com sucesso!");
        this.$router.push("/dashboard");
      } catch (e) {
        console.error("Erro ao atualizar usuário:", e);
        alert("Erro ao atualizar usuário!");
      }
    },
    cancelar() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.editar-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("/img/Navefundo.png") no-repeat center/cover;
  padding: 20px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.35);
}

.editar-card {
  position: relative;
  z-index: 2;
  background: rgba(255,255,255,0.95);
  padding: 30px;
  border-radius: 20px;
  width: 400px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.acoes-formulario {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.salvar {
  flex: 1;
  margin-right: 5px;
  background: linear-gradient(135deg, #002f55, #008cff);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
}

.salvar:hover {
  background: linear-gradient(135deg, #008cff, #002f55);
}

.cancelar {
  flex: 1;
  margin-left: 5px;
  background: linear-gradient(135deg, #ac0000, #ff0000);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
}

.cancelar:hover {
  background: linear-gradient(135deg, #ff0000, #ac0000);
}
</style>
