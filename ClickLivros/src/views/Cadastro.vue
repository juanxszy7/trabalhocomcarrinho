<template>
  <div class="register-page">
    <div class="card" role="main" aria-labelledby="register-title">
      <h1 id="register-title">ClickLivros — Cadastro</h1>

      <form @submit.prevent="onSubmit" novalidate>
        <label class="field">
          <span>Email</span>
          <input
            v-model.trim="form.email"
            type="email"
            autocomplete="username"
            required
            :class="{ invalid: errors.email }"
            placeholder="seu@email.com"
            name="email"
          />
          <small v-if="errors.email" class="error">{{ errors.email }}</small>
        </label>

        <label class="field">
          <span>Senha</span>
          <div class="password-wrap">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              minlength="6"
              placeholder="••••••••"
              name="senha"
            />
            <button type="button" class="icon-btn" @click="togglePassword">
              <span v-if="showPassword">👁️</span>
              <span v-else>🙈</span>
            </button>
          </div>
          <small v-if="errors.password" class="error">{{ errors.password }}</small>
        </label>

        <label class="field">
          <span>Confirmar Senha</span>
          <input
            v-model="form.confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            required
            placeholder="••••••••"
          />
          <small v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</small>
        </label>

        <button class="primary" :disabled="loading">
          <span v-if="!loading">Cadastrar</span>
          <span v-else>Cadastrando...</span>
        </button>

        <p class="small">
          Já tem conta?
          <RouterLink to="/login">Entrar</RouterLink>
        </p>
      </form>

      <transition name="fade">
        <div v-if="message" class="toast" role="status">{{ message }}</div>
      </transition>
    </div>

    
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'Cadastro',
  data() {
    return {
      form: reactive({
        email: '',
        password: '',
        confirmPassword: ''
      }),
      errors: reactive({ email: '', password: '', confirmPassword: '' }),
      showPassword: false,
      loading: false,
      message: ''
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    validate() {
      this.errors.email = ''
      this.errors.password = ''
      this.errors.confirmPassword = ''

      if (!this.form.email) this.errors.email = 'Email é obrigatório.'
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.form.email))
        this.errors.email = 'Email inválido.'

      if (!this.form.password) this.errors.password = 'Senha é obrigatória.'
      else if (this.form.password.length < 6)
        this.errors.password = 'Senha deve ter ao menos 6 caracteres.'

      if (this.form.confirmPassword !== this.form.password)
        this.errors.confirmPassword = 'As senhas não coincidem.'

      return !this.errors.email && !this.errors.password && !this.errors.confirmPassword
    },
    async onSubmit() {
      this.message = ''
      if (!this.validate()) return

      this.loading = true
      try {
        const res = await axios.post('http://localhost:3000/cadastro', {
          email: this.form.email,
          senha: this.form.password
        })

        this.message = res.data.message || 'Cadastro realizado com sucesso!'
        setTimeout(() => this.$emit('go-login'), 2000)
      } catch (err) {
        this.message =
          err.response?.data?.message || 'Erro ao cadastrar. Tente novamente.'
      } finally {
        this.loading = false
        setTimeout(() => (this.message = ''), 3000)
      }
    }
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

.register-page {
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
.field { display: block; margin-bottom: 14px }
.field span { display: block; font-size: 13px; color: var(--muted); margin-bottom: 6px }
input[type="email"], input[type="password"], input[type="text"] {
  width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #e6e9f2; outline: none; font-size: 14px;
}
input:focus { box-shadow: 0 0 0 3px rgba(26,115,232,0.08); border-color: var(--primary) }
.invalid { border-color: var(--danger) }
.error { color: var(--danger); font-size: 12px; margin-top: 6px; display: block }

.primary { width:100%; padding:10px 12px; border-radius:8px; border:0; background:var(--CorPrincipal); color:white; font-weight:600; cursor:pointer }
.primary[disabled]{ opacity:0.7; cursor:wait }

.small { font-size:13px; color:var(--muted); margin-top:12px }

.brand { max-width:420px; text-align:left }
.brand h2 { margin:0 0 8px 0 }

.password-wrap { display:flex; align-items:center; gap:8px }
.icon-btn { background:transparent; border:0; cursor:pointer; font-size:18px }

.toast { margin-top:14px; background:#111827; color:white; padding:10px 12px; border-radius:8px }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s }
.fade-enter-from, .fade-leave-to { opacity:0 }

@media (max-width: 880px){
  .register-page { grid-template-columns: 1fr; padding: 28px }
  .brand { order: -1; margin-bottom: 20px }
}
</style>
