const adminDAO = require('../DAO/adminDAO');
const orderDAO = require('../DAO/orderDAO');

exports.getAllUsers = async (req, res) => {
  const users = await adminDAO.getAllUsers();
  res.json(users);
};

exports.getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;
  const orders = await orderDAO.getOrdiniByUser(userId);
  res.json(orders);
};

exports.blockUser = async (req, res) => {
  const userId = req.params.userId;
  await adminDAO.blockUser(userId);
  res.json({ message: 'Utente bloccato' });
};

exports.setAdmin = async (req, res) => {
  const userId = req.params.userId;
  const { admin } = req.body;
  await adminDAO.setAdmin(userId, admin);
  res.json({ message: admin ? 'Utente promosso ad admin' : 'Utente declassato a user' });
};

exports.aggiornaStatoOrdine = async (req, res) => {
  const orderId = req.params.orderId;
  const { stato, dettagli_spedizione } = req.body;
  console.log('Ricevuto dal frontend:', { stato, dettagli_spedizione, orderId });
  await orderDAO.aggiornaStatoOrdine(orderId, stato, dettagli_spedizione);
  res.json({ message: 'Stato ordine aggiornato' });
};

exports.rimuoviUtente = async (req, res) => {
  const userId = req.params.userId;
  await adminDAO.rimuoviUtente(userId);
  res.json({ message: 'Utente eliminato' });
};

exports.unblockUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await adminDAO.unblockUser(userId);
    res.status(200).json({ message: 'Utente sbloccato' });
  } catch (err) {
    console.error('Errore nello sblocco utente:', err); 
    res.status(500).json({ error: 'Errore nello sblocco utente' });
  }
};

