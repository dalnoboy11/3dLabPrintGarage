const { getBotReply, BOT_REPLIES } = require('../js/chatbot');

describe('getBotReply', () => {
    describe('price-related keywords', () => {
        test('responds to "ціна"', () => {
            expect(getBotReply('ціна')).toBe(BOT_REPLIES.PRICE);
        });

        test('responds to "вартість"', () => {
            expect(getBotReply('вартість друку')).toBe(BOT_REPLIES.PRICE);
        });

        test('responds to "скільки"', () => {
            expect(getBotReply('скільки це коштує?')).toBe(BOT_REPLIES.PRICE);
        });

        test('is case-insensitive for price keywords', () => {
            expect(getBotReply('ЦІНА')).toBe(BOT_REPLIES.PRICE);
            expect(getBotReply('Вартість')).toBe(BOT_REPLIES.PRICE);
        });
    });

    describe('photo-related keywords', () => {
        test('responds to "фото"', () => {
            expect(getBotReply('надіслати фото')).toBe(BOT_REPLIES.PHOTO);
        });

        test('responds to "зображ" (prefix match for "зображення")', () => {
            expect(getBotReply('є зображення')).toBe(BOT_REPLIES.PHOTO);
        });

        test('responds to "картин" (prefix match for "картинка")', () => {
            expect(getBotReply('маю картинку')).toBe(BOT_REPLIES.PHOTO);
        });

        test('is case-insensitive for photo keywords', () => {
            expect(getBotReply('ФОТО')).toBe(BOT_REPLIES.PHOTO);
        });
    });

    describe('time-related keywords', () => {
        test('responds to "час"', () => {
            expect(getBotReply('який час виконання?')).toBe(BOT_REPLIES.TIME);
        });

        test('responds to "терм" (prefix match for "терміни")', () => {
            expect(getBotReply('терміни виконання?')).toBe(BOT_REPLIES.TIME);
        });

        test('is case-insensitive for time keywords', () => {
            expect(getBotReply('ЧАС')).toBe(BOT_REPLIES.TIME);
        });
    });

    describe('default reply', () => {
        test('returns default for unrecognized message', () => {
            expect(getBotReply('привіт')).toBe(BOT_REPLIES.DEFAULT);
        });

        test('returns default for empty string', () => {
            expect(getBotReply('')).toBe(BOT_REPLIES.DEFAULT);
        });

        test('returns default for null input', () => {
            expect(getBotReply(null)).toBe(BOT_REPLIES.DEFAULT);
        });

        test('returns default for undefined input', () => {
            expect(getBotReply(undefined)).toBe(BOT_REPLIES.DEFAULT);
        });

        test('returns default for a message with no matching keyword', () => {
            expect(getBotReply('дякую за інформацію')).toBe(BOT_REPLIES.DEFAULT);
        });
    });

    describe('keyword priority', () => {
        test('price keywords take precedence when message contains both price and photo keywords', () => {
            expect(getBotReply('ціна за фото')).toBe(BOT_REPLIES.PRICE);
        });
    });
});
