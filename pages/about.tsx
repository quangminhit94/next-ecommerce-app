import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import Header from '@/components/common/header';
import dynamic from 'next/dynamic'
import { useEffect } from 'react';
import { GetStaticPropsContext } from 'next';
// const Header = dynamic(() => import('@/components/common/header'), { ssr: false })

export interface AboutPageProps {
}

export function AboutPage (props: AboutPageProps) {
  const [accountList, setAccountList] = React.useState([])
  const router = useRouter()
  console.log('About Query: ', router.query);
  const page = router.query?.page
  
  useEffect(() => {
    if(!page) return;
    (async () => {
      const baseApi = `https://react-bank-data.herokuapp.com/api/accounts?_limit=10&_page=${page}`
      const response = await fetch(baseApi)
      const data = await response.json()
      setAccountList(data.data)
    })()

  }, [page])
  function handleNextPage() {
    router.push({
      pathname: '/about',
      query: {
        page: (Number(page) || 1) + 1
      }
    }, undefined, {
      shallow: true
    })
  }
  return (
    <div>
      <h1>
        About page
      </h1>
      <Header />
      <ul className="postList">
        {accountList?.map((account:any) => <li key={account.id}>{account.fullName}</li>)}
        
      </ul>
      <button onClick={handleNextPage}>Next page</button>
    </div>
  );
}

export default AboutPage
export const getStaticProps = async (context: GetStaticPropsContext) => {
  console.log('next static props');
  return {
    props: {}
  }
}


