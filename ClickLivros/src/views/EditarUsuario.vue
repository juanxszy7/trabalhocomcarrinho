<template>
  <div class="editar-page">
    <div class="overlay"></div>

    <div class="editar-card">
      <h1>Editar Usuário</h1>
      <form @submit.prevent="atualizarUsuario">
        <div class="form-group">
          <label>Nome</label>
          <input v-model="form.nome" type="text" placeholder="Digite o nome" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="Digite o email" required />
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
      form: { _id: "", nome: "", email: "" },
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (!id) {
      alert("ID do usuário não fornecido!");
      this.$router.push("/Dashboard");
      return;
    }
    this.carregarUsuario(id);
  },
  methods: {
    async carregarUsuario(id) {
      try {
        const res = await axios.get(`http://localhost:3000/dashboard/${id}`);
        this.form = { ...res.data };
      } catch (e) {
        console.error(e);
        alert("Usuário não encontrado!");
        this.$router.push("/Dashboard");
      }
    },
    async atualizarUsuario() {
      try {
        await axios.put(`http://localhost:3000/dashboard/${this.form._id}`, this.form);
        alert("Usuário atualizado com sucesso!");
        this.$router.push("/dashboard");
      } catch (e) {
        console.error(e);
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
/* ================= PÁGINA ================= */
.editar-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #001f3f, #0056b3); /* gradiente azul moderno */
  padding: 20px;
  font-family: "Poppins", sans-serif;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.25);
}

/* ================= CARD ================= */
.editar-card {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.97);
  padding: 40px 35px;
  border-radius: 25px;
  width: 400px;
  max-width: 95%;
  box-shadow: 0 15px 40px rgba(0,0,0,0.25);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.editar-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0,0,0,0.3);
}

/* ================= TÍTULO ================= */
h1 {
  margin-bottom: 30px;
  color: #002f55;
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* ================= FORM ================= */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #003366;
  font-weight: 500;
  font-size: 0.95rem;
}

input {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: 0.3s;
}
input:focus {
  border-color: #0077ff;
  box-shadow: 0 0 10px rgba(0,119,255,0.3);
}

/* ================= BOTÕES ================= */
.acoes-formulario {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.salvar, .cancelar {
  flex: 1;
  padding: 14px 0;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  color: #fff;
  font-size: 1rem;
}

.salvar {
  background: linear-gradient(135deg, #0077ff, #00c6ff);
  margin-right: 10px;
  box-shadow: 0 6px 15px rgba(0,118,255,0.4);
}
.salvar:hover {
  background: linear-gradient(135deg, #005ecb, #009ecb);
  transform: translateY(-2px);
}

.cancelar {
  background: linear-gradient(135deg, #e74c3c, #ff4d4d);
  margin-left: 10px;
  box-shadow: 0 6px 15px rgba(231,76,60,0.4);
}
.cancelar:hover {
  transform: translateY(-2px);
}
</style>