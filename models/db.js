const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados
const db = new sqlite3.Database('./meu_banco.db', (err) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

module.exports = {
    // Insere dados na tabela

    insertData: (name, email, password) => {
        new Promise((resolve, reject) => {
            const insert = db.prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)")
            insert.run(name, email, password)

            insert.finalize()
        })
    },

    // Consulta os dados inseridos
    query: () => {
        new Promise((resolve, reject) => {
            const each = db.each("SELECT id, nome, email FROM usuarios", (err, row) => {
                return console.log(`Usuário: ${row.id}, Nome: ${row.nome}, Email: ${row.email}`);
            })
        })
    },
    // Fecha a conexão com o banco de dados
    close: () => {
        db.close((err) => {
            if (err) {
                console.error('Erro ao fechar o banco de dados:', err.message);
            } else {
                console.log('Conexão com o banco de dados fechada.');
            }
        })
    }
}
