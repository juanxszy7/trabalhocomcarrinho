<template>
  <div class="login-page">
    <div class="card" role="main" aria-labelledby="login-title">
      <h1 id="login-title">ClickLivros — Entrar</h1>

      <form @submit.prevent="onSubmit" novalidate method="POST">
        <!-- Email -->
        <label class="field">
          <span>Email</span>
          <input
            v-model.trim="form.email"
            type="email"
            autocomplete="username"
            required
            :class="{ invalid: errors.email }"
            @keydown.enter="onSubmit"
            placeholder="seu@email.com"
            name="email"
          />
          <small v-if="errors.email" class="error">{{ errors.email }}</small>
        </label>

        <!-- Senha -->
        <label class="field">
          <span>Senha</span>
          <div class="password-wrap">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
              minlength="6"
              @keydown.enter="onSubmit"
              placeholder="••••••••"
              name="senha"
            />
            <button
              type="button"
              class="icon-btn"
              @click="togglePassword"
              :aria-pressed="showPassword"
            >
              <span v-if="showPassword">👁️</span>
              <span v-else>🙈</span>
            </button>
          </div>
          <small v-if="errors.password" class="error">{{ errors.password }}</small>
        </label>

        <!-- Botão Entrar -->
        <button class="primary" :disabled="loading">
          <span v-if="!loading">Entrar</span>
          <span v-else>Entrando...</span>
        </button>

        <div class="divider">ou</div>

        <p class="small">
          Ainda não tem conta?
          <RouterLink to="/cadastro">Criar Conta</RouterLink>  
        </p>
      </form>

      <!-- Toast -->
      <transition name="fade">
        <div v-if="message" class="toast" role="status">{{ message }}</div>
      </transition>
    </div>
</div>

</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['login-success', 'go-register'])

const form = reactive({ email: '', password: '', remember: false })
const errors = reactive({ email: '', password: '' })
const showPassword = ref(false)
const loading = ref(false)
const message = ref('')

const STORAGE_KEY = 'clicklivros_login'

// Recupera email salvo
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  if (saved?.email) {
    form.email = saved.email
    form.remember = true
  }
} catch (e) {}

function validate() {
  errors.email = ''
  errors.password = ''

  if (!form.email) errors.email = 'Email é obrigatório.'
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
    errors.email = 'Email inválido.'

  if (!form.password) errors.password = 'Senha é obrigatória.'
  else if (form.password.length < 6)
    errors.password = 'Senha deve ter ao menos 6 caracteres.'

  return !errors.email && !errors.password
}

function togglePassword() {
  showPassword.value = !showPassword.value
}

async function onSubmit() {
  message.value = ''
  if (!validate()) return

  loading.value = true
  try {
    const res = await axios.post("http://localhost:3000/login", {
      email: form.email,
      senha: form.password
    })

    message.value = res.data.message

    // Salva email se "lembrar-me" estiver marcado
    if (form.remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: form.email }))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }

    // Emite evento com usuário logado
    setTimeout(() => emit('login-success', res.data.user), 500)
  } catch (err) {
    message.value = err.response?.data?.message || "Erro ao logar."
  } finally {
    loading.value = false
    setTimeout(() => (message.value = ''), 3000)
  }
}
</script>

<style scoped>
:root {
  --bg: #f4f7fb;
  --card: #ffffff;
  --primary: #1a73e8;
  --muted: #6b7280;
  --danger: #ef4444;
}

.login-page {
  min-height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  align-items: center;
  justify-items: center;
  padding: 48px;
  background: linear-gradient(180deg, #eef2ff 0%, var(--bg) 100%);
}
.card {
  width: 420px;
  background: var(--card);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(20, 20, 50, 0.08);
  padding: 28px;
  transform-origin: center;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0) }
  50% { transform: translateY(-6px) }
  100% { transform: translateY(0) }
}

h1 { font-size: 20px; margin: 0 0 18px 0; }
.field { display:block; margin-bottom: 14px }
.field span { display:block; font-size: 13px; color: var(--muted); margin-bottom: 6px }
input[type="email"], input[type="password"], input[type="text"] {
  width:100%; padding: 10px 12px; border-radius:8px; border:1px solid #e6e9f2; outline:none; font-size:14px;
}
input:focus { box-shadow: 0 0 0 3px rgba(26,115,232,0.08); border-color: var(--primary) }
.invalid { border-color: var(--danger) }
.error { color: var(--danger); font-size: 12px; margin-top:6px; display:block }
.row { display:flex; align-items:center; gap:8px; margin: 10px 0 }
.primary { width:100%; padding:10px 12px; border-radius:8px; border:0; background:var(--CorPrincipal); color:rgb(255, 255, 255); font-weight:600; cursor:pointer }
.primary[disabled] { opacity:0.7; cursor:wait }
.divider { text-align:center; color:var(--muted); margin:14px 0 }
.oauth-row { display:flex; gap:8px }
.oauth { flex:1; padding:8px 10px; border-radius:8px; border:1px solid #e6e9f2; cursor:pointer }
.oauth.google { background: linear-gradient(90deg,#fff 0,#fff 100%) }
.oauth.github { background: linear-gradient(90deg,#f8fafc 0,#fff 100%) }
.small { font-size:13px; color:var(--muted); margin-top:12px }
.brand { max-width:420px; text-align:left }
.brand h2 { margin:0 0 8px 0 }
.password-wrap { display:flex; align-items:center; gap:8px }
.icon-btn { background:transparent; border:0; cursor:pointer; font-size:18px }
.toast { margin-top:14px; background:#111827; color:white; padding:10px 12px; border-radius:8px }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s }
.fade-enter-from, .fade-leave-to { opacity:0 }

@media (max-width: 880px) {
  .login-page { grid-template-columns: 1fr; padding: 28px }
  .brand { order: -1; margin-bottom: 20px }
}
</style>
