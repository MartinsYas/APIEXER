const pool = require('../config/db');

formataCEP = (cep) => {
    if(cep.length === 8){
        return cep.slice(0, 5) + '-' + cep.slice(5);
    }
    return cep;
}

exports.create = async (req, res) =>{
    const {nomepessoa, rua, bairro, cep} = req.body;

    try{
        const result = await pool.query('INSERT INTO localizacao (nomepessoa, rua, bairro, cep) VALUES ($1, $2, $3, $4) RETURNING *',
       [nomepessoa, rua, bairro, formataCEP(cep)]);
       res.status(201).json(result.rows);

    } catch (error){
        console.log(error);
        res.status(500).json({Message: 'Erro ao cadastrar localizacao'});
       }
    }

exports.getAll = async (req, res) =>{
    try{
        const result = await pool.query('SELECT * FROM localizacao');
       return res.status(201).json(result.rows);

    } catch (error){
        console.log(error);
        return res.status(500).json({Message: 'Erro ao mostrar todos os endereços'});
       }
    }

    
exports.getOne = async (req, res) =>{
    const {idpessoa} = req.params
    try{
        const result = await pool.query(`SELECT * FROM localizacao WHERE idpessoa = ${idpessoa}`);
       return res.status(201).json(result.rows)

    } catch (error){
        console.log(error);
        res.status(500).json({Message: 'Erro! Tente novamente'});
       }

       if(result.rows.length === 0){
        console.log(`Usuário inexistente`);
    }
    }

    
    exports.update = async (req, res) => {           
        const {idpessoa} = req.params
        const {campo, valor} = req.body
        console.log(req.body)
    
        try {
            const result = await pool.query(
                `UPDATE localizacaoS Set ${campo} = $1 WHERE idpessoa = $2`,
                [valor, idpessoa]
            )
           return res.status(201).json(result.rows[0])
        } catch (error) {
            console.log(error)
            res.status(500).json({Message: "Impossivel ler localizacao"})
        }
    }

    
exports.delete = async (req, res) =>{
    const {idpessoa} = req.params
    try{
        const result = await pool.query('DELETE FROM localizacao WHERE idpessoa = $1', [idpessoa]);
       
        return res.status(201).json({Message: "Usuário deletado"});

    } catch (error){
        console.log(error);
        res.status(500).json({Message: 'Erro! Tente novamente'});
       }

       if(result.rows.length === 0){
        res.status(400).json({Message: 'Sem dados do endereço'})
     };
    }

    
    
    

