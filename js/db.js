/**
 * Nombre de la base de datos
 * @type {string}
 */
export const DB_NAME = "ReservasDB";

/**
 * Nombre del almacén de objetos en la base de datos
 * @type {string}
 */
export const STORE_NAME = "reservas";

/**
 * Versión de la base de datos
 * @type {number}
 */
export const DB_VERSION = 1;

/**
 * Clase para manejar la conexión a IndexedDB y operaciones relacionadas
 */
export class Database {
  /**
   * Método estático para abrir la conexión con la base de datos
   * @returns
   */
  static openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      /**
       * Maneja el evento que se dispara cuando la base de datos necesita ser actualizada
       * @param {IDBVersionChangeEvent} event - El veneto de la actualizacion de versión de la base de datos
       */
      request.onupgradeneeded = (event) => {
        /**
         * Instancia de la base de datos que se está actualizando
         */
        const db = event.target.result;

        /**
         * Verificamos si el almacén de objectos existe en la base de datos
         * @type {boolean}
         */
        const storeExists = db.objectStoreNames.contains(STORE_NAME);

        //   Si el almacén de objectos no existe, se crea uno nuevo
        if (!storeExists) {
          /**
           * Crea un nuevo almacén de objetos en la base de datos
           * @type {IDBObjectStore}
           */
          db.createObjectStore(STORE_NAME, {
            keyPath: "id", // Clave principal para cada objeto en el almacén
            autoIncrement: true, // Indica que el valor de la clave principal debe autoincrementarse
          });
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  }
}
