<template>
  <div class="dashboard">
    <h1>📋 Usuários Cadastrados</h1>

    <!-- Estado de carregamento -->
    <p v-if="loading" class="status loading">Carregando usuários...</p>

    <!-- Mensagem de erro -->
    <p v-else-if="erro" class="status erro">{{ erro }}</p>

    <!-- Nenhum usuário -->
    <p v-else-if="usuarios.length === 0" class="status vazio">Nenhum usuário encontrado.</p>

    <!-- Tabela de usuários -->
    <div v-else class="tabela-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usuarios" :key="user._id">
            <td>{{ user._id }}</td>
            <td>{{ user.nome }}</td>
            <td>{{ user.email }}</td>
            <td class="acoes">
              <button class="editar" @click="editarUsuario(user)">✏️ Editar</button>
              <button class="excluir" @click="excluirUsuario(user._id)">🗑️ Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>


  <!-- Fundo escurecido -->
    <div
      v-if="abrirModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <!-- Modal -->
      <div class="bg-white p-6 rounded-2xl shadow-xl w-96 relative">
        <!-- Botão de fechar -->
        <button
          @click="abrirModal = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 class="text-xl font-semibold mb-4 text-center">Formulário</h2>

        <form @submit.prevent="enviarFormulario" class="flex flex-col gap-3">
          <label class="flex flex-col">
            <span class="text-sm text-gray-700 mb-1">Nome:</span>
            <input
              v-model="form.nome"
              type="text"
              required
              class="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </label>

          <label class="flex flex-col">
            <span class="text-sm text-gray-700 mb-1">Email:</span>
            <input
              v-model="form.email"
              type="email"
              required
              class="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </label>

          <button
            type="submit"
            class="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>


</template>

<script>
import axios from "axios"
import { useRouter } from "vue-router"

const router = useRouter()

import { ref } from 'vue'

const abrirModal = ref(false)
const form = ref({
  nome: '',
  email: ''
})

export default {
  name: "Dashboard",
  data() {
    return {
      usuarios: [],
      loading: true,
      erro: null
    }
  },
  async mounted() {
    console.log("✅ Dashboard montada, buscando usuários...")
    try {
      const res = await axios.get("http://localhost:3000/dashboard")
      console.log("📦 Usuários recebidos do backend:", res.data)
      this.usuarios = res.data
    } catch (err) {
      this.erro = "Erro ao carregar usuários."
      console.error("❌ Erro ao buscar usuários:", err)
    } finally {
      this.loading = false
      console.log("⏳ Carregamento finalizado")
    }
  },
  methods: {   

    editarUsuario(usuario) {
      this.$router.push(`/editar-usuario/${usuario._id}`);
    },

    async excluirUsuario(id) {
      if (!confirm("Tem certeza que deseja excluir este usuário?")) return
      try {
        await axios.delete(`http://localhost:3000/dashboard/${id}`) // <-- corrigido
        this.usuarios = this.usuarios.filter(u => u._id !== id)
        alert("Usuário excluído com sucesso ✅")
      } catch (err) {
        console.error("❌ Erro ao excluir usuário:", err)
        alert("Erro ao excluir usuário ❌")
      }
    }
}

}
</script>

<style scoped>
.dashboard {
  padding: 40px;
  font-family: "Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f9fafc, #eef2f7);
  min-height: 100vh;
}

/* Título */
h1 {
  margin-bottom: 25px;
  color: #1a237e;
  font-size: 28px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Mensagens de status */
.status {
  padding: 12px 18px;
  border-radius: 10px;
  margin: 15px 0;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}
.status.loading {
  background: #e3f2fd;
  color: #0d47a1;
}
.status.erro {
  background: #ffebee;
  color: #c62828;
}
.status.vazio {
  background: #fffde7;
  color: #f57f17;
}

/* Container da tabela */
.tabela-container {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

/* Tabela */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 16px 20px;
  text-align: left;
}

th {
  background: var(--CorPrincipal);
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.3px;
}

td {
  border-top: 1px solid #f0f0f0;
  font-size: 14px;
  color: #333;
}

/* Linhas alternadas */
tr:nth-child(even) {
  background: #f9fafb;
}

/* Hover suave */
tr {
  transition: background 0.25s ease, transform 0.15s ease;
}
tr:hover {
  background: #e8f0fe;
  transform: scale(1.01);
}

/* Coluna de ações */
td.acoes {
  display: flex;
  gap: 10px;
}

/* Botões */
button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

button:hover {
  transform: scale(1.05);
}

button.editar {
  background: #e3f2fd;
  color: #1565c0;
}

button.excluir {
  background: #ffebee;
  color: #c62828;
}
</style>
