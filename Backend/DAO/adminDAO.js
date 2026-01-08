const { getConnection, execute } = require('../connection/DB');

class AdminDAO {
  async getAllUsers() {
    const connection = await getConnection();
    const sql = 'SELECT id, email, ruolo, is_blocked FROM "user"';
    const result = await execute(connection, sql, []);
    connection.done();
    return result;
  }

  async blockUser(userId) {
    const connection = await getConnection();
    const sql = 'UPDATE "user" SET is_blocked = true WHERE id = $1';
    await execute(connection, sql, [userId]);
    connection.done();
  }
  
   async unblockUser(userId) {
    const connection = await getConnection();
    const sql = 'UPDATE "user" SET is_blocked = false WHERE id = $1';
    await execute(connection, sql, [userId]);
    connection.done();
  }

  async setAdmin(userId, admin) {
    const connection = await getConnection();
    const ruolo = admin ? 'admin' : 'user';
    const sql = 'UPDATE "user" SET ruolo = $1 WHERE id = $2';
    await execute(connection, sql, [ruolo, userId]);
    connection.done();
  }

  async rimuoviUtente(userId) {
    const connection = await getConnection();
    const sql = 'DELETE FROM "user" WHERE id = $1';
    await execute(connection, sql, [userId]);
    connection.done();
  }
}

module.exports = new AdminDAO();