const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json()); // Permite receber JSON no body

// --- Conexão com MongoDB ---
mongoose.connect('mongodb://localhost:27017/ClickLivrosUsuarios', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado com sucesso"))
.catch(err => console.error("Erro ao conectar no MongoDB:", err));

// --- Schema e Model ---
const UsuarioSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// --- Rotas ---

// Teste de conexão
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

// Cadastro de usuário
app.post('/cadastro', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ message: "Email e senha são obrigatórios." });

    try {
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) return res.status(400).json({ message: "Usuário já existe." });

        // Criptografar senha
        const hashedSenha = await bcrypt.hash(senha, 10);

        const novoUsuario = new Usuario({ email, senha: hashedSenha });
        await novoUsuario.save();

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao cadastrar usuário.", error: err.message });
    }
});

// Login de usuário
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ message: "Email e senha são obrigatórios." });

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ message: "Usuário não encontrado." });

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) return res.status(400).json({ message: "Senha incorreta." });

        res.json({ message: "Login realizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao realizar login.", error: err.message });
    }
});

// --- Iniciar servidor ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
