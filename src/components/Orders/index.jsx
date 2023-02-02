import React, { useState, useEffect } from 'react'
import { api } from '../../utils/api'
import './styles.css'

const ORDER_STATUS = {
  WAITING: 'Aguardando confirmação',
  IN_PRODUCTION: 'Em preparo',
  DONE: 'Finalizado'
}

const OPTIONALS_INGREDIENTS = {
  bacon: 'Bacon',
  salami: 'Salame',
  onion: 'Cebola',
  chedar: 'Chedar',
  tomato: 'Tomate',
  pickles: 'Pepino'
}

const Orders = () => {
  const [orders, setOrders] = useState({})
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    api.get('orders').then(({ data }) => {
      setOrders(data)
    })
  }, [updated])

  const onDelete = (order) => {
    const message = order.status === 'DONE'
      ? 'Tem certeza que deseja REMOVER o pedido da listagem?'
      : 'Tem certeza que deseja CANCELAR o pedido?'

    const response = confirm(message)
    if (response) {
      api.delete(`orders/${order._id}`).then(() => {
        setOrders((prevState) => {
          return prevState.filter((prev) => prev._id !== order._id)
        })
      })
    }
  }

  const updateStatus = (order) => {
    const status = order.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE'
    api.put(`orders/${order._id}`, { status }).then(() => {
      alert('Status do pedido atualizado')
      setUpdated(prevState => !prevState)
    })
  }

  return (
    <div>
      <h1 id="titulo">Gerenciar pedidos:</h1>

      {orders.length > 0
        ? (
        <table>
          <thead>
            <tr>
              <td>#</td>
              <td>Cliente</td>
              <td>pão</td>
              <td>Carne</td>
              <td>Opcionais</td>
              <td>Status</td>
              <td>Ações</td>
            </tr>
          </thead>
          {orders.map((order, idx) => (
            <tbody key={idx}>
              <tr>
                <td>{order._id}</td>
                <td>{order.client}</td>
                <td>{order.bread}</td>
                <td>{order.meat}</td>

                <td>
                  <ul>
                    {Object.keys(order.optionals).map((key, idx) => (
                      <li key={idx}>{OPTIONALS_INGREDIENTS[key]}</li>
                    ))}
                  </ul>
                </td>

                <td>{ORDER_STATUS[order.status]}</td>

                <td id="btn">
                  <button
                    className={order.status !== 'WAITING' ? 'btn-disabled' : ''}
                    disabled={order.status !== 'WAITING'}
                    onClick={() => updateStatus(order)}
                  >
                    Confirmar
                  </button>
                  <button
                    className={order.status !== 'IN_PRODUCTION' ? 'btn-disabled' : ''}
                    disabled={order.status !== 'IN_PRODUCTION' && true}
                    onClick={() => updateStatus(order)}
                  >
                    Pronto
                  </button>
                  <button
                    onClick={() => onDelete(order)}
                  >
                    {order.status === 'DONE' ? 'Remover da listagem' : 'Cancelar'}
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
          )
        : (
        <h2>Aguardando Pedidos...</h2>
          )}
    </div>
  )
}

export default Orders
