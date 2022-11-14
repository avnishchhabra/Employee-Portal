import { Button, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RaiseHazard from '../../components/forms/RaiseHazard'
import HazardColumns from '../../utils/columns/HazardColumns'
import headers from '../../utils/header';

const Hazards = () => {
  const [hazards , setHazards] = useState()
  const [raiseHazard , setRaiseHazard] = useState(false)
  useEffect(() => {
   getHazards()
  } , [])
  const getHazards = () => axios.get(`hazards/`, headers).then(res => setHazards(res.data))
  return (
    <>
    {raiseHazard && <RaiseHazard getHazards={getHazards} raiseHazard={raiseHazard} setRaiseHazard={setRaiseHazard} />}
     <div className="flex justifyBetween mb-lg">
        <h2>Hazards</h2>
        <Button onClick={() => setRaiseHazard(true)} type="primary">
          Raise a hazard
        </Button>
      </div>
    <Table loading={!hazards} columns={[...HazardColumns , {
        title: "Take action",
        render: () => <p className='link pointer'>Take action</p>
    }]} dataSource={hazards} />
    </>
  )
}

export default Hazards