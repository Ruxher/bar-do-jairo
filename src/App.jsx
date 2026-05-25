
import styles from './App.module.css'
import '@fontsource-variable/montserrat'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import VendasDiarias from './routes/VendasDiarias'
import Caixa from './routes/Caixa'
import VendasSemanais from './routes/VendasSemanais'
import VendasMensais from './routes/VendasMensais'

function App() {
    const [estoque, setEstoque] = useState([])
    const [caixa, setCaixa] = useState([])
    const [vendasDiarias, setVendasDiarias] = useState([])
    const [vendasSemanais, setVendasSemanais] = useState([])
    const [vendasMensais, setVendasMensais] = useState([])

    useEffect(() => {
        fetch("https://bar-do-jairo.onrender.com/estoque")
            .then(res => res.json())
            .then(data => setEstoque(data))
    }, [])

    useEffect(() => {
        fetch("https://bar-do-jairo.onrender.com/vendas/diarias")
            .then(res => res.json())
            .then(data => setVendasDiarias(data))
    }, [])

    useEffect(() => {
        fetch("https://bar-do-jairo.onrender.com/vendas/semanais")
            .then(res => res.json())
            .then(data => setVendasSemanais(data))
    }, [])

    useEffect(() => {
        fetch("https://bar-do-jairo.onrender.com/vendas/mensais")
            .then(res => res.json())
            .then(data => setVendasMensais(data))
    }, [])

    const tipos = [...new Set(caixa.map(item => item.tipo))];
    const porTipo = tipos.map(tipo => caixa.filter(item => item.tipo === tipo));

    useEffect(() => {
        setCaixa(
            estoque.map((item) => ({
                ...item,
                vendas: 0,
                lucroBruto: 0,
                lucroLiquido: 0
            }))
        )
    }, [estoque])

    useEffect(() => {
        console.log(vendasDiarias)
    }, [vendasDiarias])

    return (
        <BrowserRouter>
            <Header />
            <Routes>

                <Route path='/' element={<Caixa
                    setVendasDiarias={setVendasDiarias}
                    vendasDiarias={vendasDiarias}
                    setCaixa={setCaixa} caixa={caixa}
                    porTipo={porTipo}
                    tipos={tipos}
                />} ></Route>

                <Route path='/vendas/diarias' element={<VendasDiarias
                    vendasDiarias={vendasDiarias}
                    vendasSemanais={vendasSemanais}
                    setVendasSemanais={setVendasSemanais}
                    setVendasDiarias={setVendasDiarias}
                    porTipo={porTipo}
                />} ></Route>

                <Route path='/vendas/semanais' element={<VendasSemanais
                    vendasSemanais={vendasSemanais}
                    setVendasMensais={setVendasMensais}
                    vendasDiarias={vendasDiarias}
                />} ></Route>

                <Route path='/vendas/mensais' element={<VendasMensais
                    vendasMensais={vendasMensais}
                />} ></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App
