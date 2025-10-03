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

// Listar todos os usuários
app.get('/dashboard', async (req, res) => {
  try {
    const usuarios = await User.find().select('-senha'); // sem senha
    return res.status(200).json(usuarios);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

// Buscar usuário por ID
app.get('/dashboard/:id', async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).select('-senha');
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
    return res.status(200).json(usuario);
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

// Criar novo usuário
app.post('/dashboard', async (req, res) => {
  try {
    const { nome, email, senha, tipoUsuario } = req.body;
    const novoUsuario = new User({ nome, email, senha, tipoUsuario });
    await novoUsuario.save();
    return res.status(201).json({ mensagem: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

app.put('/dashboard/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, idade } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ mensagem: 'ID inválido' });
  }

  try {
    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      { nome, email, idade },
      { new: true }
    );
    if (!usuarioAtualizado) return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    res.json(usuarioAtualizado);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao atualizar usuário', erro: err.message });
  }
});

// Deletar usuário por ID
app.delete('/dashboard/:id', async (req, res) => {
  try {
    const usuarioDeletado = await User.findByIdAndDelete(req.params.id);
    if (!usuarioDeletado) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
    return res.status(200).json({ mensagem: 'Usuário deletado com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

// --- Inicia servidor ---
app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000")
})
