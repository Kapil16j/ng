"use client"

// Layout Imports
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Cookies from 'js-cookie'

import LayoutWrapper from '../../@layouts/LayoutWrapper'
import VerticalLayout from '../../@layouts/VerticalLayout'

// Component Imports
import Providers from '../../components/Providers'
import Navigation from '../../components/layout/vertical/Navigation'
import Navbar from '../../components/layout/vertical/Navbar'
import VerticalFooter from '../../components/layout/vertical/Footer'

// import { useEffect } from 'react'



const Layout =  ({ children }) => {
  // Vars
  const direction = 'ltr'
  const router = useRouter()
  const accesstoken = Cookies.get("accesstoken")

  // if(!accesstoken) return{
  //   router.push('/login')
  // } 

  // if(!accesstoken){
  //   return  router.push('/login')
  // }

  useEffect(() => {

    if (!accesstoken) {
      router.push("/admin/app/home/login")
    }

  }, [accesstoken])


  return (
    <Providers direction={direction}>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout navigation={<Navigation />} navbar={<Navbar />} footer={<VerticalFooter />}>
            {children}
          </VerticalLayout>
        }
      />
    </Providers>
  )
}

export default Layout
