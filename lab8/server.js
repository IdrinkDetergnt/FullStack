const express = require('express');
const path = require('path');

const app = express();
const usuarios = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Projects.html'));
});

app.get('/cadastra', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Cadastro.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Login.html'));
});

app.post('/cadastra', (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.render('resposta', {
            titulo: 'Cadastro',
            sucesso: false,
            mensagem: 'Preencha todos os campos.',
            voltar: '/cadastra'
        });
    }

    const existe = usuarios.find((u) => u.usuario === usuario);

    if (existe) {
        return res.render('resposta', {
            titulo: 'Cadastro',
            sucesso: false,
            mensagem: 'Usuário já cadastrado.',
            voltar: '/cadastra'
        });
    }

    usuarios.push({ usuario, senha });

    res.render('resposta', {
        titulo: 'Cadastro',
        sucesso: true,
        mensagem: 'Usuário ' + usuario + ' cadastrado com sucesso.',
        voltar: '/login'
    });
});

app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    const encontrado = usuarios.find(
        (u) => u.usuario === usuario && u.senha === senha
    );

    if (encontrado) {
        return res.render('resposta', {
            titulo: 'Login',
            sucesso: true,
            mensagem: 'Login realizado com sucesso. Bem-vindo, ' + usuario + '.',
            voltar: '/'
        });
    }

    res.render('resposta', {
        titulo: 'Login',
        sucesso: false,
        mensagem: 'Usuário ou senha incorretos.',
        voltar: '/login'
    });
});

app.listen(80, () => {
    console.log('Servidor rodando na porta 80');
});
