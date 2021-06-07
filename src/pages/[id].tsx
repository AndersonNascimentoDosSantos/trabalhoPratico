import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { investments, reports } from '../Data/Investiment'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import { useRouter } from 'next/router'
import styles from '../styles/home.module.scss'

type Data = {
        id: string,
        investmentId: string,
        month: number,
        year: number,
        value: number,
        date:Date,
        diff:number

}

type SlugProps = {
    data:Data[]
}
const Investiments = ({ data }:SlugProps) => {
  if (!data) {
    return (
          <div>
              carregando...
          </div>
    )
  }
  const { query } = useRouter()
  const index = investments.find(obj => obj.id === query.id)
  return (

    <section className={styles.allInvestiments}>
    <h2>Todos os Investimentos</h2>
    {/* <h2>{`${data[data.length - 1]}`}</h2> */}
    <h2>{`O ${index.description} \n rendeu ${Math.fround(((data[data.length - 1].value / data[0].value) - 1) * 100).toFixed(2)}%`}</h2>
    <table cellSpacing={0}>
      <thead>
       <tr>
        <td>data</td>
        <td>valor</td>
        <td>Rendimento</td>

        </tr>
      </thead>
      <tbody>
        {data.map(invest => {
          return (
            <tr key={invest.id}>
              <td >
{format(invest.date, 'dd-MMM-yyyy', {
  locale: ptBR
})}</td>
              <td>
                    {Math.fround(invest.value).toFixed(2)}
              </td>

              <td>
              {`${Math.fround(invest.diff).toFixed(2)}%`}
              </td>
              </tr>
          )
        })}
      </tbody>

    </table>

       </section>

  )
}

export default Investiments

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = investments.map(inv => {
    return { params: { id: inv.id } }
  })
  return {
    paths,
    fallback: false
  }
}
export const getStaticProps:GetStaticProps = async (context) => {
  const { id } = context.params
  const data = reports.filter(report => {
    return report.investmentId === id
  }).map((rep) => {
    const date = Date.UTC(Number(rep.year), Number(rep.month))
    return {
      ...rep,
      date,
      diff: 0
    }
  }).sort(function (a, b) {
    return a.month - b.month
  })

  for (let i = 1; i < data.length; i++) {
    data[i].diff = ((data[i].value / data[i - 1].value) - 1) * 100
  }
  return {
    props: {
      data
    }
  }
}
