import { useState } from 'react';
import styles from './Itens.module.css';

function Itens({ setCaixa, caixa, tipo }) {
    const [valor, setValor] = useState({});

    function Adicionar(id) {
        const qtdDigitada = Number(valor[id]) || 1;

        setCaixa((prevCaixa) =>
            prevCaixa.map((item) => {

                if (item._id === id) {
                    const novaVendaDiaria = item.vendas + qtdDigitada;
                    const novoLucroBruto = (novaVendaDiaria * item.preco).toFixed(2);
                    const novoLucroLiquido = ((item.preco - item.custo) * novaVendaDiaria).toFixed(2);
                    return {
                        ...item,
                        vendas: novaVendaDiaria,
                        lucroBruto: novoLucroBruto,
                        lucroLiquido: novoLucroLiquido
                    };
                }
                return item;
            })
        );
        setValor(prev => ({ ...prev, [id]: '' }));
    }

    function Remover(id) {
        setCaixa((prevCaixa) =>
            prevCaixa.map((item) => {
                if (item._id === id) {
                    if (item.vendas > 0) {
                        const novaVendaDiaria = item.vendas - 1;
                        const novoLucroBruto = (novaVendaDiaria * item.preco).toFixed(2);
                        const novoLucroLiquido = ((item.preco - item.custo) * novaVendaDiaria).toFixed(2);
                        return {
                            ...item,
                            vendas: novaVendaDiaria,
                            lucroBruto: novoLucroBruto,
                            lucroLiquido: novoLucroLiquido
                        };
                    }
                }
                return item;
            })
        );
    }

    const lidarMudança = (id, e) => {
        const { value } = e.target;
        setValor((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const caixaFiltrado = caixa.filter((itens) => itens.tipo === tipo)

    return (
        <div className={styles.itens}>
            {
                caixaFiltrado.map((item) => {
                    return (
                        <div key={item._id} className={styles.item}>
                            <h2>{item.nome}</h2>
                            <p className={styles.vendas}>Vendas: {item.vendas}</p>
                            <p className={styles.bruto}>
                                Lucro Bruto: {item.lucroBruto === 0 ? Number(0).toFixed(2) : item.lucroBruto}
                            </p>
                            <p className={styles.total}>
                                Lucro Liquido: {item.lucroLiquido === 0 ? Number(0).toFixed(2) : item.lucroLiquido}
                            </p>
                            <form onSubmit={(e) => e.preventDefault()} className={styles.botoes}>
                                <button type="button" className={styles.botaoRemover} onClick={() => Remover(item._id)}>
                                    Remover
                                </button>
                                <input
                                    type='number'
                                    placeholder="Quantidade"
                                    value={valor[item._id] || ''}
                                    onChange={(e) => lidarMudança(item._id, e)}
                                    onKeyDown={(e) => e.key === "Enter" && Adicionar(item._id)}
                                />
                                <button type="button" className={styles.botao} onClick={() => Adicionar(item._id)}>
                                    Adicionar
                                </button>
                            </form>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Itens;