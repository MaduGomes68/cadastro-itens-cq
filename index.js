const express = require('express');
const path = require('path');
const app = express();


const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicDir = path.join(__dirname, './public');

let pessoas = [
    {
        id: 1,
        nome: 'Lara',
        login: 'admin',
        senha: '123',
        idade: 14,
        irmaos: true,
        cidade: 'São Paulo',
        hobby: 'Desenhar'
    },
    {
        id: 2,
        nome: 'Gaby',
        login: 'admin1',
        senha: '123',
        idade: 13,
        irmaos: false,
        cidade: 'Rio de Janeiro',
        hobby: 'Tocar violão'
    },
    {
        id: 3,
        nome: 'Anna Laura',
        login: 'admin3',
        senha: '123',
        idade: 14,
        irmaos: true,
        cidade: 'Belo Horizonte',
        hobby: 'Dançar'
    },
    {
        id: 4,
        nome: 'Yasmin',
        login: 'admin4',
        senha: '123',
        idade: 13,
        irmaos: true,
        cidade: 'Salvador',
        hobby: 'Ler livros'
    },
    {
        id: 5,
        nome: 'Lynne',
        login: 'admin5',
        senha: '123',
        idade: 13,
        irmaos: true,
        cidade: 'Curitiba',
        hobby: 'Jogar videogame'
    },
];

app.get("/", (req, res) => {
    res.sendFile(path.join(publicDir, "login.html"));
});

app.post('/login', (req, res) => {
    const { login, senha } = req.body
    console.log(req.login)
  
    if (!login || !senha) {
        res.status(404).json({
            status: 404,
            message: "Requisição inválida"
        })
    }

    const usuario = pessoas.find((p) => p.login === login)
    if (!usuario) {
        res.status(404).json({
            status: 404,
            message: "Usuário não encontrado"
        })
    }
    if (usuario.senha !== senha) {
        res.status(404).json({
            status: 404,
            message: "Senha inválida"
        })
    }
    console.log("tentando acessar")
   
    res.redirect('/itens.html')
})
app.get('/itens.html', (req, res) => {
    res.sendFile(path.join(publicDir, 'itens.html'));
})



app.get('/pessoas', (req, res) => {
    res.status(200).json(pessoas);
})

app.post('/pessoas', (req, res) => {
    const {nome, login, senha } = req.body

    if(!nome || !senha || !login){
        res.status(400).json('Faltou informação')
    }

    const pessoaExiste = pessoas.find((p) => p.login === login)
    if(pessoaExiste){
        res.status(404).json("Pessoa existe")
    }

    const novaPessoa = {
        id: pessoas.length + 1,
        nome,
        login,
        senha,
    }
    pessoas.push(novaPessoa)
    res.status(201).json("Pessoa criada com sucesso!")
})


app.delete('/pessoa/:id', (req, res) => {
    
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const index = pessoas.findIndex(p => p.id === id);

    if (index !== -1) {
        pessoas.splice(index, 1);
        return res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } else {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

app.put('/pessoa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log ("ID: ", id)

    const pessoa = pessoas.find(p => p.id === id);
    console.log ("pessoa: ", pessoa)

    if (!pessoa) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }
   
    const novaPessoa = req.body;
    console.log ("Antiga pessoa: ", pessoa)
    console.log ("Nova pessoa: ", novaPessoa)
    
    pessoa.nome = novaPessoa.nome
    pessoa.login = novaPessoa.login
    pessoa.senha = novaPessoa.senha
    pessoa.idade = novaPessoa.idade
    pessoa.irmaos = novaPessoa.irmaos
    pessoa.cidade = novaPessoa.cidade
    pessoa.hobby = novaPessoa.hobby

    pessoas[pessoa.id - 1] = pessoa

    console.log("Pessoas: ", pessoas)
    res.json(pessoas);
})

app.get("/pessoa/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) {
        return res.status(404).json({error: "Usuário não encontrado"});
    }

    res.json(pessoa);
})
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});