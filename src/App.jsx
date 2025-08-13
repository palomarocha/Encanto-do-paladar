import { useState } from "react";
import jsPDF from "jspdf";

const produtos = [
  { nome: "Açafrão", preco: 4.90, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Alho frito", preco: 4.00, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Ana Maria aves", preco: 3.20, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Beef ribes", preco: 6.60, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Chimichurri defumado", preco: 6.70, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Colorau especial", preco: 2.20, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "DuGuedes", preco: 6.70, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Folha de louro", preco: 1.20, tipo: "13g", categoria: "Produtos (100g)" },
  { nome: "Lemon Pepper", preco: 3.40, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Orégano", preco: 5.10, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Páprica Defumada", preco: 3.40, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Pimenta Calabresa", preco: 3.70, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Tempero baiano sem pimenta", preco: 3.70, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Tempero baiano com pimenta", preco: 3.70, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Tempero do chef", preco: 3.70, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Tempero gourmet", preco: 5.10, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Tempero para feijão", preco: 5.90, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Tempero pega marido", preco: 6.40, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Aveia", preco: 1.10, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Canela em pó", preco: 4.90, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Chia semente", preco: 2.90, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Farinha de coco", preco: 3.20, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Farinha de Linhaça dourada", preco: 2.50, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Linhaça dourada semente", preco: 2.40, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Psyllium", preco: 5.30, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Uva passa preta sem semente", preco: 3.10, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Capim limão", preco: 2.40, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Camomila", preco: 5.30, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Erva doce", preco: 4.10, tipo: "100g", categoria: "Produtos (100g)" },
  { nome: "Biscoito Abacaxi com coco", preco: 10.20, tipo: "350g", categoria: "Biscoitos Amanteigados (350g)" },
  { nome: "Biscoito Amendoim", preco: 10.20, tipo: "350g", categoria: "Biscoitos Amanteigados (350g)" },
  { nome: "Biscoito Casadinho", preco: 10.20, tipo: "350g", categoria: "Biscoitos Amanteigados (350g)" },
  { nome: "Biscoito Coco", preco: 10.20, tipo: "350g", categoria: "Biscoitos Amanteigados (350g)" },
  { nome: "Biscoito Leite ninho", preco: 10.20, tipo: "350g", categoria: "Biscoitos Amanteigados (350g)" },
  { nome: "Biscoito Nata", preco: 10.20, tipo: "350g", categoria: "Biscoitos Amanteigados (350g)" },
  { nome: "Biscoito Nozes", preco: 10.20, tipo: "350g", categoria: "Biscoitos Amanteigados (350g)" },
  { nome: "Biscoito Oito de queijo", preco: 10.20, tipo: "350g", categoria: "Biscoitos Amanteigados (350g)" },
  { nome: "Biscoito Queijadinha", preco: 10.20, tipo: "350g", categoria: "Biscoitos Amanteigados (350g)" },
  { nome: "Biscoito Romeu e Julieta", preco: 10.20, tipo: "350g", categoria: "Biscoitos Amanteigados (350g)" },
  { nome: "Biscoito escaldado", preco: 2.90, tipo: "100g", categoria: "Biscoitos (100g)" },
  { nome: "Biscoito papa ovo", preco: 2.90, tipo: "100g", categoria: "Biscoitos (100g)" },
  { nome: "Suspiro", preco: 3.99, tipo: "100g", categoria: "Biscoitos (100g)" }
];

export default function App() {
    const [nome, setNome] = useState("");
    const [local, setLocal] = useState("");
    const [pedido, setPedido] = useState([]);

    const adicionarProduto = (produto) => {
        const index = pedido.findIndex((p) => p.nome === produto.nome);
        if (index >= 0) {
            const novoPedido = [...pedido];
            novoPedido[index].quantidade += 1;
            setPedido(novoPedido);
        } else {
            setPedido([...pedido, { ...produto, quantidade: 1 }]);
        }
    };

    const removerQuantidade = (produto) => {
        const index = pedido.findIndex((p) => p.nome === produto.nome);
        if (index >= 0) {
            const novoPedido = [...pedido];
            if (novoPedido[index].quantidade > 1) {
                novoPedido[index].quantidade -= 1;
            } else {
                novoPedido.splice(index, 1);
            }
            setPedido(novoPedido);
        }
    };

    const total = pedido.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    const gerarPDF = () => {
        const pdf = new jsPDF();
        let y = 10;

        pdf.setFontSize(16);
        pdf.text("Encanto do Paladar - Pedido", 10, y);
        y += 10;

        pdf.setFontSize(12);
        pdf.text(`Cliente: ${nome}`, 10, y);
        y += 10;

        pdf.text(`Local de entrega: ${local}`, 10, y);
        y += 15;

        pdf.text("Itens do pedido:", 10, y);
        y += 10;

        pedido.forEach((item) => {
            const texto = `${item.nome} (${item.tipo}) x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
            pdf.text(texto, 10, y);
            y += 10;
        });

        y += 10;
        pdf.text(`Total: R$ ${total.toFixed(2)}`, 10, y);

        pdf.save(`Pedido_${nome}.pdf`);
    };

    const categorias = [...new Set(produtos.map(p => p.categoria))];

    return (
        <div className="container">
            <div className="titulo-inicio">
                <div className="titulo-barra"></div>
                <h1 className="titulo">Encanto do Paladar</h1>
            </div>

            <div className="conteudo">
                <div className="coluna-esquerda">
                    <div className="formulario">
                        <input
                            type="text"
                            placeholder="Nome do cliente"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Local de entrega"
                            value={local}
                            onChange={(e) => setLocal(e.target.value)}
                        />
                    </div>

                    <div className="produtos">
                        <h2 className="subtitulo">Produtos</h2>
                        {categorias.map((categoria) => {
                            const produtosFiltrados = produtos.filter(p => p.categoria === categoria);
                            return (
                                <div key={categoria} className="categoria-bloco">
                                    <h3 className="subcategoria">{categoria}</h3>
                                    <div className="produtos-grid">
                                        {produtosFiltrados.map((p) => (
                                            <button
                                                key={p.nome}
                                                onClick={() => adicionarProduto(p)}
                                                className="btn-produto"
                                            >
                                                {p.nome} ({p.tipo}) - R$ {p.preco.toFixed(2)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="coluna-direita">
                    <div className="resumo">
                        <h3 className="titulo-pedido">Resumo do Pedido</h3>

                        <p><strong>Cliente:</strong> {nome}</p>
                        <p><strong>Local:</strong> {local}</p>

                        <ul className="lista-pedido">
                            {pedido.map((item) => (
                                <li key={item.nome} className="item-pedido">
                                    <span>
                                        {item.nome} ({item.tipo}) x{item.quantidade}
                                    </span>
                                    <span className="acoes-item">
                                        <button onClick={() => removerQuantidade(item)} className="btn-remover">-</button>
                                        <button onClick={() => adicionarProduto(item)} className="btn-adicionar">+</button>
                                        <span className="preco-item">
                                            R$ {(item.preco * item.quantidade).toFixed(2)}
                                        </span>
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <p className="total">Total: R$ {total.toFixed(2)}</p>

                        {pedido.length > 0 && (
                            <button onClick={gerarPDF} className="btn-gerar-pdf">
                                Gerar PDF do Pedido
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <footer className="footer">
                <p>Desenvolvido por : Paloma Rocha.</p>
                <div className="footer-links">
                    <a href="https://github.com/palomarocha" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" alt="GitHub" />
                    </a>
                    <a href="https://www.linkedin.com/in/paloma-rocha-amaral-02239031a" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn" />
                    </a>
                </div>
            </footer>
        </div>
    );
}
