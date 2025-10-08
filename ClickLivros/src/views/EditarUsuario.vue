<template>
  <div class="editar-usuario">
    <h1>✏️ Editar Usuário</h1>

    <!-- Estado de carregamento -->
    <p v-if="loading" class="status">Carregando dados...</p>

    <!-- Erro -->
    <p v-else-if="erro" class="erro">{{ erro }}</p>

    <!-- Formulário -->
    <form v-else @submit.prevent="atualizarUsuario" class="form-editar">
      <label>
        Nome:
        <input v-model="form.nome" type="text" required />
      </label>

      <label>
        Email:
        <input v-model="form.email" type="email" required />
      </label>

      <button type="submit" :disabled="salvando">
        {{ salvando ? 'Salvando...' : 'Salvar Alterações' }}
      </button>
    </form>

    <!-- Confirmação -->
    <p v-if="sucesso" class="sucesso">✅ Usuário atualizado com sucesso!</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditarUsuario',
  data() {
    return {
      form: {
        nome: '',
        email: ''
      },
      loading: true,
      erro: '',
      sucesso: false,
      salvando: false
    }
  },
  async created(id) {
    const id = this.$route.params.id;
    try {
      const res = await axios.get(`http://localhost:3000/dashboard/${id}`)
      this.form = {...res.data}
    } catch (e) {
      this.erro = 'Erro ao carregar usuário.'
    } finally {
      this.loading = false
    }
  },
  methods: {
    async atualizarUsuario() {
      const id = this.$route.params.id
      try {
        this.salvando = true
        await axios.put(`http://localhost:3000/dashboard/${id}`, this.form)
        this.sucesso = true
        setTimeout(() => this.$router.push('/dashboard'), 2000)
      } catch (e) {
        this.erro = 'Erro ao atualizar usuário.'
      } finally {
        this.salvando = false
      }
    }
  }
}
</script>

<style scoped>
.editar-usuario {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: #f6f6f6;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.erro {
  color: red;
  text-align: center;
}
.sucesso {
  color: green;
  text-align: center;
}
</style>
