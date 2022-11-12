import { Drawer } from 'antd'
import React from 'react'

const CustomDrawer = ({children , title , open , onClose}) => {
  return (
   <Drawer title={title} open={open} onClose={onClose}>
    {children}
   </Drawer>
  )
}

export default CustomDrawer