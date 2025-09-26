<template>
  <div class="dashboard">
    <h1>📊 Painel de Administração</h1>

    <table v-if="usuarios.length" class="usuarios-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Função</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in usuarios" :key="user._id">
          <td>{{ user.email }}</td>
          <td>
            <span :class="user.role">{{ user.role }}</span>
          </td>
          <td>{{ user._id }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Nenhum usuário encontrado.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const usuarios = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/usuarios', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // se usar JWT
      }
    })
    usuarios.value = res.data
  } catch (err) {
    console.error('Erro ao carregar usuários', err)
  }
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
h1 {
  margin-bottom: 20px;
}
.usuarios-table {
  width: 100%;
  border-collapse: collapse;
}
.usuarios-table th,
.usuarios-table td {
  padding: 10px;
  border: 1px solid #ddd;
}
.admin {
  color: red;
  font-weight: bold;
}
.user {
  color: blue;
}
</style>
