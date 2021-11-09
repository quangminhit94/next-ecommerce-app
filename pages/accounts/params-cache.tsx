import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export interface ParamsPageProps {
  query: any
  account: any
}

export default function ParamsPage({ query, account }: ParamsPageProps) {
  const router = useRouter()
  const [seconds, setSeconds] = useState(0)
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((x) => {
        if (x > 60) clearInterval(intervalId)
        return x + 1
      })
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      <h1>Params Page</h1>

      <p>Time: {seconds}s</p>

      <h2>account Detail</h2>
      <p>{account?.fullName}</p>
      <p>{account?.accountNumber}</p>
    </div>
  )
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 's-maxage=5')

  // fake slow query
  // await new Promise((resolve) => setTimeout(resolve, 3000))

  const accountId = context.query.accountId
  if (!accountId) return { props: { query: context.query } }

  const API_URL = `https://react-bank-data.herokuapp.com/api/accounts/${accountId}`
  const response = await fetch(API_URL)
  const data = await response.json()
  console.log('call getServerSideProps');
  return {
    props: {
      query: context.query,
      account: data.data
    }
  }
}
