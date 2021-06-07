/* eslint-disable no-use-before-define */
// import { parseISO } from 'date-fns';
// import format from 'date-fns/format';
// import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link'
import React from 'react'
// import { api } from '../services/api';
import styles from '../../styles/home.module.scss'
import { cities } from '../../Data/election'

export default function Election () {
  return (

  <section className={styles.allInvestiments}>
  <h2>Modulo 02 Desafio </h2>
  <table cellSpacing={0}>
    <thead>
      <tr>

      <td>{'selecione uma cidade e veja o resultado das "eleições"'} </td>
      <td><Link href='/'>
      <a> Visualizar Trabalho Pratico Modulo 2</a>
      </Link></td>
      </tr>
    </thead>
    <tbody>
      {cities.map(invest => {
        return (
          <tr key={invest.id}>
             <td>
              <Link href={`/election/${invest.name}`}>
              <a>{invest.name}</a>
              </Link>
            </td>

          </tr>
        )
      })}
    </tbody>

  </table>

     </section>
  )
}
