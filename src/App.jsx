import { useState } from "react";
import jsPDF from "jspdf";

const produtos = [
    { nome: "Açafrão", preco: 5, tipo: "100g", categoria: "Condimentos" },
    { nome: "Alho frito", preco: 4.9, tipo: "100g", categoria: "Condimentos" },
    { nome: "Ana Maria aves", preco: 4.2, tipo: "100g", categoria: "Condimentos" },
    { nome: "Beef ribes", preco: 7.6, tipo: "100g", categoria: "Condimentos" },
    { nome: "Chimichurri defumado", preco: 7.4, tipo: "100g", categoria: "Condimentos" },
    { nome: "Colorau especial", preco: 2.5, tipo: "100g", categoria: "Condimentos" },
    { nome: "DuGuedes", preco: 7.4, tipo: "100g", categoria: "Condimentos" },
    { nome: "Folha de louro", preco: 1.2, tipo: "13g", categoria: "Condimentos" },
    { nome: "Lemon Pepper", preco: 4.6, tipo: "100g", categoria: "Condimentos" },
    { nome: "Orégano", preco: 6, tipo: "100g", categoria: "Condimentos" },
    { nome: "Páprica Defumada", preco: 4.4, tipo: "100g", categoria: "Condimentos" },
    { nome: "Pimenta Calabresa", preco: 4.4, tipo: "100g", categoria: "Condimentos" },
    { nome: "Tempero baiano sem pimenta", preco: 4.2, tipo: "100g", categoria: "Condimentos" },
    { nome: "Tempero baiano com pimenta", preco: 4.2, tipo: "100g", categoria: "Condimentos" },
    { nome: "Tempero do chef", preco: 4.2, tipo: "100g", categoria: "Condimentos" },
    { nome: "Tempero gourmet", preco: 6, tipo: "100g", categoria: "Condimentos" },
    { nome: "Tempero para feijão", preco: 6.8, tipo: "100g", categoria: "Condimentos" },
    { nome: "Tempero pega marido", preco: 7.3, tipo: "100g", categoria: "Condimentos" },
    { nome: "Aveia", preco: 1.2, tipo: "100g", categoria: "Outros" },
    { nome: "Canela em pó", preco: 6.5, tipo: "100g", categoria: "Condimentos" },
    { nome: "Chia semente", preco: 3.6, tipo: "100g", categoria: "Outros" },
    { nome: "Farinha de coco", preco: 3.7, tipo: "100g", categoria: "Outros" },
    { nome: "Farinha de Linhaça dourada", preco: 3.3, tipo: "100g", categoria: "Outros" },
    { nome: "Linhaça dourada semente", preco: 3.1, tipo: "100g", categoria: "Outros" },
    { nome: "Psyllium", preco: 5.9, tipo: "100g", categoria: "Outros" },
    { nome: "Uva passa preta sem semente", preco: 3.4, tipo: "100g", categoria: "Outros" },
    { nome: "Capim limão", preco: 3.5, tipo: "100g", categoria: "Chás" },
    { nome: "Camomila", preco: 6.5, tipo: "100g", categoria: "Chás" },
    { nome: "Erva doce", preco: 4.5, tipo: "100g", categoria: "Chás" },
    { nome: "Biscoito Abacaxi com coco", preco: 11, tipo: "350g", categoria: "Biscoitos" },
    { nome: "Biscoito Amendoim", preco: 11, tipo: "350g", categoria: "Biscoitos" },
    { nome: "Biscoito Casadinho", preco: 11, tipo: "350g", categoria: "Biscoitos" },
    { nome: "Biscoito Coco", preco: 11, tipo: "350g", categoria: "Biscoitos" },
    { nome: "Biscoito Leite ninho", preco: 11, tipo: "350g", categoria: "Biscoitos" },
    { nome: "Biscoito Nata", preco: 11, tipo: "350g", categoria: "Biscoitos" },
    { nome: "Biscoito Nozes", preco: 11, tipo: "350g", categoria: "Biscoitos" },
    { nome: "Biscoito Oito de queijo", preco: 11, tipo: "350g", categoria: "Biscoitos" },
    { nome: "Biscoito Queijadinha", preco: 11, tipo: "350g", categoria: "Biscoitos" },
    { nome: "Biscoito Romeu e Julieta", preco: 11, tipo: "350g", categoria: "Biscoitos" },
    { nome: "Biscoito escaldado", preco: 3.2, tipo: "100g", categoria: "Biscoitos" },
    { nome: "Biscoito papa ovo", preco: 3.2, tipo: "100g", categoria: "Biscoitos" },
    { nome: "Suspiro", preco: 4.2, tipo: "100g", categoria: "Biscoitos" }
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
