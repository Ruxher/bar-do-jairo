import styles from './VendasSemanais.module.css'

function VendasDiarias({ setVendasDiarias, vendasSemanais, setVendasSemanais, vendasDiarias, tipos, porTipo }) {

    async function calcularLucroSemana() {
        if (vendasDiarias.length === 0) return;

        const semanaAtual = vendasDiarias.slice(-7);

        const resumoSemana = {};
        semanaAtual.forEach((dia) => {
            Object.entries(dia).forEach(([tipo, valores]) => {
                if (tipo === 'lucroBrutoTotal' || tipo === 'lucroLiquidoTotal' || tipo === 'data') return;
                if (!resumoSemana[tipo]) {
                    resumoSemana[tipo] = { lucroBruto: 0, lucroLiquido: 0 };
                }
                resumoSemana[tipo].lucroBruto += parseFloat(valores.lucroBruto);
                resumoSemana[tipo].lucroLiquido += parseFloat(valores.lucroLiquido);
            });
        });

        Object.keys(resumoSemana).forEach((tipo) => {
            resumoSemana[tipo].lucroBruto = resumoSemana[tipo].lucroBruto.toFixed(2);
            resumoSemana[tipo].lucroLiquido = resumoSemana[tipo].lucroLiquido.toFixed(2);
        });

        let lucroBrutoTotal = 0
        let lucroLiquidoTotal = 0
        Object.values(resumoSemana).forEach((valores) => {
            lucroBrutoTotal += parseFloat(valores.lucroBruto)
            lucroLiquidoTotal += parseFloat(valores.lucroLiquido)
        })
        const hoje = new Date().toLocaleDateString('pt-BR')
        const seteDiasAtras = new Date()
        seteDiasAtras.setDate(seteDiasAtras.getDate() - 7)

        resumoSemana.dataInicio = seteDiasAtras.toLocaleDateString('pt-BR')
        resumoSemana.dataFim = hoje
        resumoSemana.lucroBrutoTotal = lucroBrutoTotal.toFixed(2)
        resumoSemana.lucroLiquidoTotal = lucroLiquidoTotal.toFixed(2)

        await fetch("http://localhost:3000/vendas/semanais", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resumoSemana)
        });

        setVendasSemanais((prev) => [...prev, resumoSemana]);
    };

    return (
        <main>
            <div className={styles.rodape}>
                <button onClick={calcularLucroSemana}>Finalizar vendas da Semana</button>
            </div>
            {vendasDiarias.map((dia, index) => (
                <div key={index} className={styles.umDia}>
                    <div className={styles.dias}>
                        <h1 className={styles.data}>{dia.data}</h1>
                        <div className={styles.tituloTabela}>
                            <h1>Nome</h1>
                            <h1>Lucro Liquido</h1>
                            <h1>Lucro Bruto</h1>
                        </div>
                        {Object.entries(dia)
                            .filter(([chave]) => chave !== 'lucroBrutoTotal' && chave !== 'lucroLiquidoTotal' && chave !== 'data')
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
                            <p className={styles.liquido}>{dia.lucroLiquidoTotal}</p>
                            <p className={styles.bruto}>{dia.lucroBrutoTotal}</p>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    )
}

export default VendasDiarias