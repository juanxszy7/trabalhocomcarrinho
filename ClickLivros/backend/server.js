// server.js
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// --- Conexão com MongoDB ---
mongoose.connect("mongodb://localhost:27017/ClickLivrosUsuarios", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado ao MongoDB"))
.catch(err => console.error("❌ Erro ao conectar no MongoDB:", err))

// --- Modelo de Usuário ---
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
})
const User = mongoose.model("User", UserSchema)

// --- Rota de Cadastro ---
app.post("/cadastro", async (req, res) => {
  try {
    const { email, senha } = req.body

    // Verifica se já existe usuário
    const usuarioExistente = await User.findOne({ email })
    if (usuarioExistente) {
      return res.status(400).json({ message: "Este email já está cadastrado." })
    }

    // Criptografa senha
    const hash = await bcrypt.hash(senha, 10)

    const novoUsuario = new User({ email, senha: hash })
    await novoUsuario.save()

    res.json({ message: "Usuário cadastrado com sucesso!" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao cadastrar usuário." })
  }
})

// --- Rota de Login ---
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body

    // Procura usuário pelo email
    const usuario = await User.findOne({ email })
    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado." })
    }

    // Compara senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if (!senhaValida) {
      return res.status(400).json({ message: "Senha incorreta." })
    }

    res.json({ message: "Login realizado com sucesso!" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erro ao realizar login." })
  }
})

// --- Inicia servidor ---
app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000")
})
