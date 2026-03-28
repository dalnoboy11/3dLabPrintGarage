// Chat bot reply logic
const BOT_REPLIES = {
    PRICE: 'Для розрахунку вартості скористайтесь нашим калькулятором вище 👆 або надішліть нам фото вашої деталі.',
    PHOTO: 'Надішліть фото через кнопку 📷 — ми оцінимо ваш проєкт!',
    TIME: 'Зазвичай ми виконуємо замовлення протягом 1–3 днів залежно від складності.',
    DELIVERY: 'Доставляємо Новою Поштою по всій Україні та за кордон. 🚚',
    DEFAULT: 'Дякуємо за повідомлення! Менеджер зв\'яжеться з вами найближчим часом. 📞',
};

function getBotReply(userText) {
    const lower = (userText || '').toLowerCase();
    if (lower.includes('ціна') || lower.includes('вартість') || lower.includes('скільки')) {
        return BOT_REPLIES.PRICE;
    }
    if (lower.includes('фото') || lower.includes('зображ') || lower.includes('картин')) {
        return BOT_REPLIES.PHOTO;
    }
    if (lower.includes('час') || lower.includes('терм')) {
        return BOT_REPLIES.TIME;
    }
    if (lower.includes('доставка') || lower.includes('відправка')) {
        return BOT_REPLIES.DELIVERY;
    }
    return BOT_REPLIES.DEFAULT;
}

if (typeof module !== 'undefined') {
    module.exports = { getBotReply, BOT_REPLIES };
}
