// Include stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function createLineItems(orderItems) {
    // Create line items with Stripe, and also store the product id and quantity in the metadata
    const lineItems = orderItems.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [item.image ? item.image : 'https://via.placeholder.com/150']
            },
            unit_amount: item.price * 100
        },
        quantity: item.quantity,
        metadata: {
            product_id: item.product_id,            
        }
    }));

    return lineItems;
}

async function createCheckoutSession(userId, orderItems, orderId) {
    const lineItems = createLineItems(orderItems);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
        metadata: {            
            userId: userId,
            orderId: orderId
        }
    });
    return session;
}



module.exports = {
    createCheckoutSession,
    updateCheckoutSession
};