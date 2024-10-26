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
            const response = await axios.get(`/api/search`, {
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

            <style jsx>{`
                .container {
                    padding: 20px;
                    color: #f5f5f5;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    max-width: 900px;
                    margin: auto;
                }
                h1 {
                    font-size: 2em;
                    color: #fff;
                    background: linear-gradient(45deg, #00bfff, #a020f0);
                    padding: 10px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                }
                .search-form {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                input, select, button {
                    padding: 10px;
                    font-size: 1em;
                    border-radius: 5px;
                    border: none;
                }
                input {
                    flex: 1;
                }
                select {
                    flex: 0.5;
                }
                button {
                    background-color: #6200ea;
                    color: #fff;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                button:hover {
                    background-color: #3700b3;
                }
                .results {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                    color: #333;
                }
                .product {
                    border: 1px solid #333;
                    padding: 15px;
                    border-radius: 10px;
                    background-color: #fff;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .product:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
                }
                .product img {
                    max-width: 100%;
                    border-radius: 5px;
                    margin-bottom: 10px;
                }
                .product h3 {
                    font-size: 1.2em;
                    color: #333;
                    margin: 10px 0;
                }
                .product p {
                    font-size: 1em;
                    color: #888;
                }
                .product a {
                    display: inline-block;
                    margin-top: 10px;
                    padding: 5px 10px;
                    background-color: #00bfff;
                    color: #fff;
                    border-radius: 5px;
                    text-decoration: none;
                    transition: background 0.3s;
                }
                .product a:hover {
                    background-color: #0094cc;
                }
                .pagination {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    color: #fff;
                }
                .pagination button {
                    background-color: #6200ea;
                    color: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .pagination button:hover {
                    background-color: #3700b3;
                }
            `}</style>
        </div>
    );
}
