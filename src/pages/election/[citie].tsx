/* eslint-disable react/prop-types */
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import { candidates, cities, election } from '../../Data/election'
import styles from '../../styles/home.module.scss'
type Data = {
  id: string,
    name: string,
    username: string,
    cityId: string,
    candidateId: string,
    votes: number

}

const Investiments = ({ data, citiee }) => {
  if (!data) {
    return (
          <div>
              carregando...
          </div>
    )
  }

  return (

    <section className={styles.allInvestiments}>
    <h2>{citiee.name}</h2>
    {/* <h2>{`${data[data.length - 1]}`}</h2> */}

    <table cellSpacing={0}>
      <thead>
       <tr>
        <td> {`votos validos: ${citiee.presence}`}</td>
        <td>{`Abstenções: ${citiee.absence} e em porcentagem:${Math.fround((citiee.absence / citiee.votingPopulation) * 100).toFixed(2)} %`}</td>
        <td>{`população votante: ${citiee.votingPopulation}`}</td>

        </tr>
      </thead>
      <tbody>
        {data.map(invest => {
          return (
            <tr key={invest.id}>
              <td style={{ width: 100 }}>
{invest.name}
                </td>
              <td>
            {invest.votes}
              </td>

              <td>
{`${Math.fround((invest.votes / citiee.presence) * 100).toFixed(2)} %`}
              </td>
              <td>

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
  const paths = cities.map(inv => {
    return { params: { citie: inv.name } }
  })
  return {
    paths,
    fallback: false
  }
}
export const getStaticProps:GetStaticProps = async (context) => {
  const { citie } = context.params
  const citiee = cities.find(cit => {
    return cit.name === citie
  })

  const electionData = election.filter(city => {
    return city.cityId === citiee.id
  })

  const cityCandidatos = candidates.filter(candidato => {
    for (const arr of electionData) {
      if (arr.candidateId === candidato.id) { return candidato }
    }
  }).map(cc => {
    for (const ar of electionData) { if (ar.candidateId === cc.id) { return { ...ar, ...cc } } }
  })

  // console.log(`candidates :${candidates.length}   citycandidatos:${cityCandidatos.length}`)
  // console.log(cityCandidatos)
  return {
    props: {
      data: cityCandidatos,
      citiee
    }
  }
}
