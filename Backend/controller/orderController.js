
const orderDAO = require('../DAO/orderDAO');
const cartDAO = require('../DAO/cartDAO');
const productDAO = require('../DAO/productDAO');

exports.createOrder = async (req, res) => {
  const userId = req.user.id;
  const indirizzoId  = req.body.spedizione.indirizzo_id;
  // Prendi il carrello utente
  const cart = await cartDAO.getCartByUser(userId);
  if (!cart.length) return res.status(400).json({ error: 'Carrello vuoto' });

  // Controlla disponibilità e calcola totale
  let totale = 0;
  for (const item of cart) {
    if (item.quantita > item.disponibilita) {
      return res.status(400).json({ error: `Prodotto ${item.name} non disponibile in quantità richiesta` });
    }
    totale += item.price * item.quantita;
  }


  // Crea ordine
  const ordine = await orderDAO.createOrder(userId, totale, indirizzoId, 'In elaborazione');

  // Inserisci prodotti nell'ordine e aggiorna disponibilità
  for (const item of cart) {
    await orderDAO.addOrderItem(ordine.id, item.prodotto_id, item.quantita, item.price);
    // Aggiorna disponibilità prodotto
    await productDAO.updateDisponibilita(item.prodotto_id, item.disponibilita - item.quantita);
  }

  // Svuota carrello
  await cartDAO.clearCart(userId);

  res.json({ message: 'Ordine creato', ordineId: ordine.id });
};

exports.getUserOrders = async (req, res) => {
  const userId = req.user.id;
  const orders = await orderDAO.getOrdiniByUser(userId);
  // Per ogni ordine, aggiungi i prodotti
  for (const ordine of orders) {
    ordine.items = await orderDAO.getOrderItems(ordine.id);
  }
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;
  // Recupera tutti gli ordini dell'utente
  const orders = await orderDAO.getOrdiniByUser(userId);
  // Trova solo quello richiesto
  const ordine = orders.find(o => o.id == Number(orderId));
  if (!ordine) return res.status(404).json({ error: 'Ordine non trovato' });

  ordine.prodotti = await orderDAO.getOrderItems(ordine.id);
  ordine.indirizzo = [
    ordine.nome_destinatario,
    ordine.indirizzo,
    `${ordine.cap}, ${ordine.citta}, ${ordine.paese}`,
    `Tel: ${ordine.telefono}`
  ].filter(Boolean).join(' - ');

  res.json(ordine);
};
