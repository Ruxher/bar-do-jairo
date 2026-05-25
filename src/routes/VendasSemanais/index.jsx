import { useEffect } from 'react';
import styles from './VendasSemanais.module.css'

function VendasSemanais({ vendasDiarias, setVendasMensais, vendasSemanais }) {

    async function calcularLucroMes() {
        if (vendasDiarias.length === 0) return;
        if (vendasDiarias.length % 31 !== 0) return;

        const mesAtual = vendasDiarias.slice(-31);

        const resumoMes = {};
        mesAtual.forEach((dia) => {
            Object.entries(dia).forEach(([tipo, valores]) => {
                if (tipo === 'lucroBrutoTotal' || tipo === 'lucroLiquidoTotal' || tipo === 'data') return;
                if (!resumoMes[tipo]) {
                    resumoMes[tipo] = { lucroBruto: 0, lucroLiquido: 0 };
                }
                resumoMes[tipo].lucroBruto += parseFloat(valores.lucroBruto);
                resumoMes[tipo].lucroLiquido += parseFloat(valores.lucroLiquido);
            });
        });

        Object.keys(resumoMes).forEach((tipo) => {
            resumoMes[tipo].lucroBruto = resumoMes[tipo].lucroBruto.toFixed(2);
            resumoMes[tipo].lucroLiquido = resumoMes[tipo].lucroLiquido.toFixed(2);
        });

        let lucroBrutoTotal = 0
        let lucroLiquidoTotal = 0
        Object.values(resumoMes).forEach((valores) => {
            lucroBrutoTotal += parseFloat(valores.lucroBruto)
            lucroLiquidoTotal += parseFloat(valores.lucroLiquido)
        })
        resumoMes.lucroBrutoTotal = lucroBrutoTotal.toFixed(2)
        resumoMes.lucroLiquidoTotal = lucroLiquidoTotal.toFixed(2)

        let mes = new Date().toLocaleDateString('pt-BR', { month: 'long' })
        resumoMes.mes = mes.charAt(0).toUpperCase() + mes.slice(1)

        await fetch("https://bar-do-jairo.onrender.com/vendas/mensais", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resumoMes)
        });

        setVendasMensais((prev) => [...prev, resumoMes]);
    }

    return (
        <main>
            <div className={styles.rodape}>
                <button onClick={calcularLucroMes}>Finalizar vendas do mês</button>
            </div>
            {vendasSemanais.map((semana, index) => (
                <div key={index} className={styles.umDia}>
                    <div className={styles.dias}>
                        <h1 className={styles.data}>{semana.dataInicio} ~ {semana.dataFim}</h1>
                        <div className={styles.tituloTabela}>
                            <h1>Nome</h1>
                            <h1>Lucro Liquido</h1>
                            <h1>Lucro Bruto</h1>
                        </div>
                        {Object.entries(semana)
                            .filter(([chave]) => chave !== 'lucroBrutoTotal' && chave !== 'lucroLiquidoTotal' && chave !== 'dataInicio' && chave !== 'dataFim')
                            .map(([chave, valores]) => (
                                <div key={chave} className={styles.dia}>
                                    <p className={styles.chave}>{chave}</p>
                                    <p className={styles.liquido}>{valores.lucroLiquido}</p>
                                    <p className={styles.bruto}>{valores.lucroBruto}</p>
                                </div>
                            ))
                        }
                        <div className={styles.dia}>
                            <p className={styles.chave}>Total</p>
                            <p className={styles.liquido}>{semana.lucroLiquidoTotal}</p>
                            <p className={styles.bruto}>{semana.lucroBrutoTotal}</p>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    )
}

export default VendasSemanais