import { Database, STORE_NAME } from "./db.js";

export class TaskService {
  /**
   * Agrega una nueva tarea a la base de datos.
   * @param {Object} reserva - La tarea que se va a agregar.
   * @returns {Promise<void>} Una promesa que se resuelve cuando la tarea se ha agregado con éxito.
   */
  static async addTask(reserva) {
    // Abre la base de datos
    return Database.openDB().then((db) => {
      // Retorna una nueva promesa para manejar la asincronía de la operación
      return new Promise((resolve, reject) => {
        // Inicia una transacción de lectura y escritura en el almacén de objetos STORE_NAME
        const transaction = db.transaction([STORE_NAME], "readwrite");
        // Obtiene el almacén de objetos en el que se agregarán las tareas
        const store = transaction.objectStore(STORE_NAME);
        // Agrega la tarea al almacén de objetos
        const request = store.add(reserva);

        // Maneja el evento cuando la operación de agregar una tarea tiene éxito
        request.onsuccess = () => {
          // Resuelve la promesa indicando que la tarea se agregó con éxito
          resolve();
        };

        // Maneja el evento si hay un error al agregar la tarea
        request.onerror = (event) => {
          // Rechaza la promesa con el error ocurrido
          reject(event.target.error);
        };
      });
    });
  }
}