const express = require('express')
const app = express()
const port = 3000
const {sequelize, User, Freela} = require('../models')
const freelas = require('../models/freelas')
app.use(express.json())

app.post('/users', async (req, res) => {
  try {
    const usuario = await User.create(req.body);
    res.status(201).json(usuario);
  } catch (erro) {
    console.error('Erro ao criar usuário:', erro);
    res.status(500).json({ error: 'Erro ao cadastrar usuário', details: erro.message });
  }
});
app.post('/freelas', async (req, res) => {
  try {
    const freela = await Freela.create(req.body);
    res.status(201).json(freela);
  } catch (erro) {
    console.error('Erro ao inserir freela:', erro);
    res.status(500).json({ error: 'Erro ao cadastrar freela', details: erro.message });
  }
});

app.listen(port, ()=>{
    console.log(`servidor funcionando na porta: ${port} `)
})
