require ('dotenv').config();

const express = require('express');
const app = express();
const useRotes = require('./routes/user');

app.use(express.json());
app.use('/api/enderecos', useRotes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Servidor rodando em ${PORT}`);
});


