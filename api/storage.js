import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('Kactydb', 1);

const getAllMessagesWithPerson = (personName) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM messages WHERE sender = ? OR receiver = ? ORDER BY timestamp',
          [personName, personName],
          (tx, results) => {
            const messages = [];
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);
              messages.push({
                id: row.id,
                sender: row.sender,
                receiver: row.receiver,
                message: row.message,
                timestamp: row.timestamp,
              });
            }
            resolve(messages);
          },
          (error) => {
            console.error('Erreur lors de la récupération des messages : ', error);
            reject(error);
          }
        );
      });
    });
  };

const sendMessage = (myName, receiver, userMessage) => {
    db.transaction((tx) => {
    tx.executeSql(
        'INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)',
        [myName, receiver, userMessage],
        (tx, results) => {
        if (results.rowsAffected > 0) {
        } else {
            console.error('Échec de l\'enregistrement du message');
        }
        },
        (error) => {
        console.error('Erreur lors de l\'enregistrement du message : ', error);
        }
    );
    });
};

const getUniquePersons = () => {
  
  return new Promise((resolve, reject) => {

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT DISTINCT sender, receiver FROM messages',
        [],
        (tx, results) => {
            const persons = new Set();
            for (let i = 0; i < results.rows.length; i++) {
              const row = results.rows.item(i);
              persons.add(row.sender);
              persons.add(row.receiver);
            }
            const uniquePersons = Array.from(persons);
            resolve(uniquePersons);
          },
          (error) => {
            console.error('Erreur lors de la récupération des personnes : ', error);
            reject(error);
          }
        );
      });
    });
};

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, sender TEXT, receiver TEXT, message TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)'
    );
  }, (error) => {
    console.error('Erreur lors de la création de la table des messages : ', error);
  });
}

module.exports = {
    getAllMessagesWithPerson,
    getUniquePersons,
    sendMessage,
    createTable
}