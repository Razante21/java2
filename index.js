// pages/index.js
export default function Home() {
    return (
        <div>
            <h1 style={{ color: 'red' }}>Teste de Estilo</h1>

            <div className="container">
                <header>
                    <h1>Buscador de Produtos do Mercado Livre</h1>
                </header>

                <form method="POST" action="/" className="search-form">
                    <input type="text" name="query" placeholder="Digite o nome do produto" required value="{{ query }}" />
                    <select name="sort">
                        <option value="sold_quantity" selected>Mais Vendidos</option>
                        <option value="price_asc">Menor Preço</option>
                        <option value="price_desc">Maior Preço</option>
                    </select>
                    <button type="submit">Buscar</button>
                </form>

                <div className="results">
                    <ul>
                        {/* Aqui você deve inserir o loop de produtos */}
                    </ul>
                </div>

                <div className="pagination">
                    {/* Aqui você deve inserir a lógica de paginação */}
                </div>
            </div>
        </div>
    );
}
