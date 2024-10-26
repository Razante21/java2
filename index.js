// pages/index.js
import { useState } from 'react';

export default function Home() {
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('sold_quantity');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aqui você deve fazer a chamada à API do Mercado Livre para buscar os produtos
        // Atualize os states searchResults, errorMessage, totalPages conforme a resposta da API
    };

    return (
        <div className="container">
            <header>
                <h1>Buscador de Produtos do Mercado Livre</h1>
            </header>

            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    name="query"
                    placeholder="Digite o nome do produto"
                    required
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="sold_quantity">Mais Vendidos</option>
                    <option value="price_asc">Menor Preço</option>
                    <option value="price_desc">Maior Preço</option>
                </select>
                <button type="submit">Buscar</button>
            </form>

            {errorMessage && <div className="error">{errorMessage}</div>}

            <div className="results">
                <ul>
                    {searchResults.map((product) => (
                        <li key={product.link}>
                            <img src={product.image} alt={product.title} style={{ width: '100%', height: 'auto', maxHeight: '300px' }} />
                            <div className="product-info">
                                <h3>{product.title}</h3>
                                <p className="product-price">R$ {product.price}</p>
                                <a href={product.link} target="_blank" rel="noopener noreferrer">Ver Produto</a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)}>Página Anterior</button>
                )}
                <span id="page-info">Página {currentPage} de {totalPages}</span>
                {currentPage < totalPages && (
                    <button onClick={() => setCurrentPage(currentPage + 1)}>Próxima Página</button>
                )}
            </div>
        </div>
    );
}
