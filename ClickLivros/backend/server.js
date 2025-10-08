// --- Dependências ---
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')

// --- Inicialização ---
const app = express()
app.use(cors())
app.use(express.json())

// --- Conexão com MongoDB ---
mongoose.connect("mongodb://localhost:27017/ClickLivrosUsuarios", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado ao MongoDB"))
.catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err))

// --- Modelo de Usuário ---
const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String
})
const Usuario = mongoose.model('Usuario', UsuarioSchema)

// --- ROTAS ---
// ✅ 2. Cadastrar novo usuário
app.post('/cadastro', async (req, res) => {
  try {
    const {nome, email, senha } = req.body

    // Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ email })
    if (usuarioExistente) {
      return res.status(400).json({ message: "Usuário já cadastrado" })
    }

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUsuario = new Usuario({
      nome,
      email,
      senha: senhaHash
    })

    await novoUsuario.save()
    res.status(201).json({ message: "Usuário cadastrado com sucesso" })
  } catch (err) {
    console.error("❌ Erro ao cadastrar usuário:", err)
    res.status(500).json({ message: "Erro no servidor ao cadastrar" })
  }
})

// ✅ 1. Listar todos os usuários (usado pelo Dashboard.vue)
app.get('/dashboard', async (req, res) => {
  try {
    const usuarios = await Usuario.find()
    res.json(usuarios)
  } catch (err) {
    console.error("❌ Erro ao buscar usuários:", err)
    res.status(500).json({ message: "Erro no servidor ao buscar usuários" })
  }
})

// Buscar usuário específico pelo ID
// app.get('/dashboard/:id', async (req, res) => {
//   try {
//     const usuario = await Usuario.findById(req.params.id);
    
//     if (!usuario) {
//       return res.status(404).json({ message: 'Usuário não encontrado' });
//     }else{
//       res.json(usuario); 
//     }

//   } catch (err) {
//     console.error("❌ Erro ao buscar usuário:", err);
//     res.status(500).json({ message: 'Erro no servidor ao buscar usuário' });
//   }
// });


// Editar perfil
app.put('/dashboard/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email } = req.body;
        await Usuario.findByIdAndUpdate(id, { nome, email });
        res.json({ mensagem: 'Usuário atualizado com sucesso!' });
    }catch (erro) { 
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro });
    }
});

// ✅ 4. Excluir usuário
app.delete('/dashboard/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id)
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }
    res.json({ message: "Usuário excluído com sucesso" })
  } catch (err) {
    console.error("❌ Erro ao excluir usuário:", err)
    res.status(500).json({ message: "Erro no servidor ao excluir" })
  }
})

// --- Servidor ---
const PORT = 3000
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`))
