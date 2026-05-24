
import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
    const localizacao = useLocation()

    const localizacaoAtual = (path) => {
        if (path === localizacao.pathname) {
            return styles.linkAtivo
        } else {
            return styles.link
        }
    }

    return (
        <header className={styles.header}>
            <h1>Bar Ribeiro</h1>
            <nav>
                <NavLink to="/" className={({isActive}) =>
                    isActive ? `${styles.navlink} ${styles.linkAtivo}` : styles.navlink
                }>Caixa</NavLink>
                <NavLink to="/vendas/mensais" className={({isActive}) =>
                    isActive ? `${styles.navlink} ${styles.linkAtivo}` : styles.navlink
                }>Vendas Mensais</NavLink>
                <NavLink to="/vendas/semanais" className={({isActive}) =>
                    isActive ? `${styles.navlink} ${styles.linkAtivo}` : styles.navlink
                }>Vendas Semanais</NavLink>
                <NavLink to="/vendas/diarias" className={({isActive}) =>
                    isActive ? `${styles.navlink} ${styles.linkAtivo}` : styles.navlink
                }>Vendas Diarias</NavLink>
            </nav>
        </header>
    )
}

export default Header