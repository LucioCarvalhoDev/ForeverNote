const dbName = 'notes_db';
const dbVersion = 1;
const stores = ['notes'];


class ConnectionFactory {
    constructor() {
        throw new Error('Essa classe é apenas estatica')
    }

    static getConnection() {

        return new Promise((resolve, reject) => {

            let request = window.indexedDB.open(dbName, dbVersion);

            request.onupgradeneeded = event => {
                
                if (!request.result.objectStoreNames.contains(stores)) {
                    request.result.createObjectStore('notes',
                    {keyPath: "_date"})
                }
            }

            request.onsuccess = event => {

                let connection = event.target.result;
                resolve(connection) 
            }
        })

    }
}