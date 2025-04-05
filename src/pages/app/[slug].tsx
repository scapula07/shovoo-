import React from 'react'
import Layout from '@/components/Dashboard/layout'
import Home from '@/components/Dashboard/home'
import { useRouter } from 'next/router';
import Discover from '@/components/Dashboard/discover';
import Connections from '@/components/Dashboard/connections';

export default function Dashboard() {
  const router = useRouter();
  const {slug} = router.query ;
  if(slug==="home"){
      return(
        <Layout>    
            <Home />
        </Layout>
      )
   }
  return (
    <div>
      
    </div>
  )
}
