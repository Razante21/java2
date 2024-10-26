const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));

app.set('view engine', 'ejs'); // Definindo o EJS como motor de visualização

app.get('/', (req, res) => {
    res.render('index', { query: '', sort: '', search_results: [], error_message: null, current_page: 1, total_pages: 1 });
});

app.post('/', (req, res) => {
    // Lógica de busca de produtos aqui

    const { query, sort, page } = req.body;
    // Aqui você deve implementar a lógica para buscar os produtos usando a API do Mercado Livre.
    // Exemplo de retorno:
    const search_results = []; // Insira os resultados aqui.
    const error_message = null; // Mensagem de erro, se houver.
    const current_page = page || 1; // Página atual
    const total_pages = 5; // Total de páginas (atualize conforme necessário)

    res.render('index', { query, sort, search_results, error_message, current_page, total_pages });
});

// Serve o HTML junto com o CSS
const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Busca de Produtos</title>
    <link rel="stylesheet" href="static/style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Buscador de Produtos do Mercado Livre</h1>
        </header>

        <form method="POST" action="/" class="search-form">
            <input type="text" name="query" placeholder="Digite o nome do produto" required value="{{ query }}">
            <select name="sort">
                <option value="sold_quantity" {% if sort == 'sold_quantity' %}selected{% endif %}>Mais Vendidos</option>
                <option value="price_asc" {% if sort == 'price_asc' %}selected{% endif %}>Menor Preço</option>
                <option value="price_desc" {% if sort == 'price_desc' %}selected{% endif %}>Maior Preço</option>
            </select>
            <button type="submit">Buscar</button>
        </form>

        {% if error_message %}
            <div class="error">{{ error_message }}</div>
        {% endif %}

        <div class="results">
            <ul>
                {% for product in search_results %}
                    <li>
                        <img src="{{ product.image }}" alt="{{ product.title }}" style="width: 100%; height: auto; max-height: 300px;">
                        <div class="product-info">
                            <h3>{{ product.title }}</h3>
                            <p class="product-price">R$ {{ product.price }}</p>
                            <a href="{{ product.link }}" target="_blank">Ver Produto</a>
                        </div>
                    </li>
                {% endfor %}
            </ul>
        </div>

        <div class="pagination">
            {% if current_page > 1 %}
                <form method="POST" action="/">
                    <input type="hidden" name="query" value="{{ query }}">
                    <input type="hidden" name="sort" value="{{ sort }}">
                    <input type="hidden" name="page" value="{{ current_page - 1 }}">
                    <button type="submit" id="prev-page">Página Anterior</button>
                </form>
            {% endif %}

            <span id="page-info">Página {{ current_page }} de {{ total_pages }}</span>

            {% if current_page < total_pages %}
                <form method="POST" action="/">
                    <input type="hidden" name="query" value="{{ query }}">
                    <input type="hidden" name="sort" value="{{ sort }}">
                    <input type="hidden" name="page" value="{{ current_page + 1 }}">
                    <button type="submit" id="next-page">Próxima Página</button>
                </form>
            {% endif %}
        </div>
    </div>
</body>
</html>
`;

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
