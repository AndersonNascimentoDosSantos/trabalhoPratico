/* eslint-disable no-use-before-define */
// import { parseISO } from 'date-fns';
// import format from 'date-fns/format';
// import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
// import { api } from '../services/api';
import styles from '../styles/home.module.scss'
import { investments } from '../Data/Investiment'

export default function Home ({ data }) {
  return (

  <section className={styles.allInvestiments}>
  <h2>Trabalho Pratico modulo 2</h2>
  <table cellSpacing={0}>
    <thead>
      <tr>
      <td>Lista de Fundos de investimentos</td>
      <td><Link href='/election'>
      <a> Visualizar Desafio Modulo 2</a>
      </Link></td>
      </tr>
    </thead>
    <tbody>
      {data.map(invest => {
        return (
          <tr key={invest.id}>
             <td>
              <Link href={`/${invest.id}`}>
              <a>{invest.description}</a>
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

export const getStaticProps: GetStaticProps = async () => {
  // const { data } = await api.get('/api')

  return {
    props: {
      data: investments
    },
    revalidate: 60 * 60 * 8
  }
}
