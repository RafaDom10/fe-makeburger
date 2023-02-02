import React from 'react'
import './styles.css'

const Header = () => {
  return (
    <header>
      <nav className="nav">
        <img id="logo" src="../public/logo.png" alt="logo" />
        <a href="/">
          <p>Fazer Pedidos</p>
        </a>
        <a href="/orders" rel="next">
          <p>Pedidos</p>
        </a>
      </nav>
    </header>
  )
}

export default Header
