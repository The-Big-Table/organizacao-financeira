import express, {Request, Response} from "express";
import {promisePool} from "./server";
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
const app = express();
const port = 3000;
import router from './routes/Routes';
import routes from "./routes/Routes";

app.use(bodyParser.urlencoded({extended: true}));

// acesso as rotas
app.use('api/financas', routes);

app.use(express.json());
app.use(cors());
dotenv.config();

// Teste para conectar com banco de Dados
promisePool.getConnection()
    .then((connection) => {
        console.log('Conectado ao Banco de Dados');
        connection.release();
    })
    .catch((error) => {
        console.error(`Erro ao conectar ao banco de dados: ${error.message}`);
        process.exit(1);
    });

//acessando servidor!!!
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
