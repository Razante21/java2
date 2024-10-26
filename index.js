import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('relevance');
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleSearch = async (page = 1) => {
        try {
            const offset = (page - 1) * 10;
            const response = await axios.get(/api/search, {
                params: { query, sort, offset },
            });
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
            setCurrentPage(page);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    return (
        <div className="container">
            <h1>Buscador de Produtos do Mercado Livre</h1>
            <div className="search-form">
                <input
                    type="text"
                    placeholder="Digite o nome do produto"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="relevance">Mais Vendidos</option>
                    <option value="price_asc">Menor Preço</option>
                    <option value="price_desc">Maior Preço</option>
                </select>
                <button onClick={() => handleSearch()}>Buscar</button>
            </div>

            <div className="results">
                {products.map((product, index) => (
                    <div key={index} className="product">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>R$ {product.price}</p>
                        <a href={product.link} target="_blank" rel="noopener noreferrer">
                            Ver Produto
                        </a>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => handleSearch(currentPage - 1)}>
                        Página Anterior
                    </button>
                )}
                <span>Página {currentPage} de {totalPages}</span>
                {currentPage < totalPages && (
                    <button onClick={() => handleSearch(currentPage + 1)}>
                        Próxima Página
                    </button>
                )}
            </div>

            <style jsx>{
                .container {
                    padding: 20px;
                }
                .search-form {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .results {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                }
                .product {
                    border: 1px solid #ccc;
                    padding: 10px;
                    text-align: center;
                }
                .pagination {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }
            }</style>
        </div>
    );
}
