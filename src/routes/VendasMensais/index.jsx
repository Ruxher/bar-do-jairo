import styles from './VendasMensais.module.css'

function VendasMensais({ vendasMensais }) {

    let mes = new Date()
    mes = mes.toLocaleDateString('pt-BR', { month: 'long' })
    const mesMaiusculo = mes.charAt(0).toUpperCase() + mes.slice(1)

    return (
        <main>
            {vendasMensais.map((mes, index) => (
                <div key={index} className={styles.umDia}>
                    <div className={styles.dias}>
                        <h1 className={styles.data}>{mes.mes}</h1>
                        <div className={styles.tituloTabela}>
                            <h1>Nome</h1>
                            <h1>Lucro Liquido</h1>
                            <h1>Lucro Bruto</h1>
                        </div>
                        {Object.entries(mes)
                            .filter(([chave]) => chave !== 'lucroBrutoTotal' && chave !== 'lucroLiquidoTotal' && chave !== 'mes')
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
                            <p className={styles.liquido}>{mes.lucroLiquidoTotal}</p>
                            <p className={styles.bruto}>{mes.lucroBrutoTotal}</p>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    )
}

export default VendasMensais