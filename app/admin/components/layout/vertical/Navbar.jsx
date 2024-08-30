"use client"

// Component Imports
import { useEffect, useState } from 'react'

import LayoutNavbar from '../../../@layouts/components/vertical/Navbar'
import NavbarContent from './NavbarContent'
import { getUser } from '@/app/store/actions/dataActions'

const Navbar = () => {
  const [user,setUser] = useState(null)



  const getUserData = async() =>{
    try {
      
      await getUser().then((data)=>{


        console.log("userdata???",data)
        setUser(data?.data)
      })
    } catch (error) {
      
    }
  }

   useEffect(()=>{
    getUserData()
   
  },[])
  
return (
    <LayoutNavbar>
      <NavbarContent user={user}/>
    </LayoutNavbar>
  )
}

export default Navbar
