// make use of orderService and stripeService to check out a shopping cart

const orderService = require('./orderService');
const stripeService = require('./stripeService');

async function checkout(userId, orderItems)  {    
    const orderId = await orderService.createOrder(userId, orderItems, session.id);
    const session = await stripeService.updateCheckoutSession(session.id, orderId);
    await orderService.updateOrderSessionId(orderId, session.id);
        
    return session;
}

module.exports = {
    checkout
};