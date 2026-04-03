// Экранировать в HTML потенциально опасные символы, чтобы текст не превращался в HTML
const escapeHTML = (unsafeString) => {
    return unsafeString
        .replaceAll(/&/g, '&amp;')
        .replaceAll(/</g, '&lt;')
        .replaceAll(/>/g, '&gt;')
        .replaceAll(/"/g, '&quot;')
        .replaceAll(/'/g, '&#39;')
};

// Экранировать спец-символы, чтобы при вводе в поле поиска фун-ия подсветки не путала 
// символы с паттерном регулярных выражений
const escapeRegExp = (unsafeString) => {
    return unsafeString.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Выделение без учета регистра
export const highlightCaseInsensitive = (text, query) => {
    const safeText = escapeHTML(text);
    const queryFormatted = query.trim();

    if (queryFormatted.length === 0) {
        return safeText
    };

    // флаг 'gi' делает поиск вхождений в обоих регистрах
    const pattern = new RegExp(escapeRegExp(queryFormatted), 'ig');

    // с помощью $& в mark вставим исходный текст в нужном регистре
    return safeText.replace(pattern, `<mark>$&</mark>`);
};