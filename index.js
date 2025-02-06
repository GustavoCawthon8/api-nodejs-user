const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://englishtemaedition:0987654321tema@cluster0.vz4ov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=> console.log("mongoDb conectado"))
.catch(err => console.error(err))

const Usuario = mongoose.model('Usuario', {
  nome: String,
  email: String,
})

app.post("/salvar", async(req, res)=>{
  try{
    const {nome, email} = req.body;
    const novoUsuario = new Usuario({nome, email});
    await novoUsuario.save();
    res.json({mensagem: "Usuário salvo com sucesso!"})
  }catch(err){
    console.log(err)
  }
})

app.get("/usuarios", async(req, res)=>{
  try{
    const usuarios = await Usuario.find();
    res.json(usuarios)
  }catch(err){
    console.log(err)
  }
})

app.listen(PORT, ()=> console.log(`Servidor rodando em http://localhost:${PORT}`))
