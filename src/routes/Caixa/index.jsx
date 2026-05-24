
import { use, useEffect, useState } from 'react';
import styles from './VendasDiarias.module.css'
import Itens from '../../components/Itens';

function Caixa({ vendasDiarias, setVendasDiarias, setCaixa, caixa, porTipo, tipos }) {

    async function calcularLucroDia() {
        const novaVenda = {}
        let lucroBrutoTotal = 0
        let lucroLiquidoTotal = 0
        for (let i = 0; i < porTipo.length; i++) {
            let somaLucroBruto = 0
            let somaLucroLiquido = 0
            porTipo[i].forEach((item) => {
                somaLucroBruto += parseFloat(item.lucroBruto)
                somaLucroLiquido += parseFloat(item.lucroLiquido)
            })
            novaVenda[`${tipos[i]}`] = {
                "lucroBruto": somaLucroBruto.toFixed(2),
                "lucroLiquido": somaLucroLiquido.toFixed(2)
            }
            lucroBrutoTotal += somaLucroBruto
            lucroLiquidoTotal += somaLucroLiquido
        }
        novaVenda.lucroBrutoTotal = lucroBrutoTotal.toFixed(2)
        novaVenda.lucroLiquidoTotal = lucroLiquidoTotal.toFixed(2)
        novaVenda.data = new Date().toLocaleDateString('pt-BR')

        await fetch("http://localhost:3000/vendas/diarias", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaVenda)
        });

        setVendasDiarias((prev) => [
            ...prev,
            novaVenda
        ])
        setCaixa((prev) =>
            prev.map((item) => ({
                ...item,
                vendas: 0,
                lucroBruto: 0,
                lucroLiquido: 0
            })))
    }

    return (
        <main className={styles.main}>
            <div className={styles.rodape}>
                <button onClick={calcularLucroDia} >Finalizar vendas do dia</button>
            </div>
            <h1>Latinhas</h1>
            <Itens setCaixa={setCaixa} caixa={caixa} tipo="Lata" />
        </main>
    )
}

export default Caixa