import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { OPTIONS } from './options'
import { api } from '../../utils/api'
import './styles.css'

const Form = () => {
  const { register, handleSubmit, resetField } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    api.post('orders', data).then(() => {
      alert('Pedido cadastrado com sucesso!')
      resetFormFields()

      navigate('/orders')
    })
  }

  const resetFormFields = () => {
    resetField('client')
    resetField('bread')
    resetField('meat')
    OPTIONS.map(op => resetField(`optionals.${op.name}`))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nome do Cliente:</label>
      <input
        type="text"
        className='clientInput'
        placeholder="Digite o seu nome"
        {...register('client')}
      />

      <label>Escolha o pão:</label>
      <select {...register('bread')}>
        <option value=""></option>
        <option value="Integral">Integral</option>
        <option value="Pão frances">Pão frances</option>
        <option value="Italiano Branco">Italiano Branco</option>
        <option value="Parmesão e Orégano">Parmesão e Orégano</option>
      </select>

      <label>Escolha a carne do seu Burger:</label>
      <select {...register('meat')}>
        <option></option>
        <option value="Maminha">Maminha</option>
        <option value="Alcatra">Alcatra</option>
        <option value="Filé">Filé</option>
        <option value="Picanha">Picanha</option>
      </select>

      <label className='optionsLabel'>Escolha os opcionais:</label>
      <ul className="options">
        {OPTIONS.map((option, idx) => (
          <li key={idx}>
            <input
              name={option.name}
              type="checkbox"
              className="check"
              {...register(`optionals.${option.name}`)}
            />{' '}
            {option.label}
          </li>
        ))}
      </ul>

      <button type="submit">Criar meu Burguer!</button>
    </form>
  )
}

export default Form
