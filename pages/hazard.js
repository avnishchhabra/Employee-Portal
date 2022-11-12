import { Button, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RaiseHazard from '../components/forms/RaiseHazard'
import HazardColumns from '../utils/columns/HazardColumns'
import LS from '../utils/Ls'

const Hazard = () => {
  const [hazards , setHazards] = useState()
  const [raiseHazard , setRaiseHazard] = useState(false)
  useEffect(() => {
   getHazards()
  } , [])
  const getHazards = () => axios.get(`hazards/?token=${LS.get('token')}`).then(res => setHazards(res.data))
  return (
    <>
    {raiseHazard && <RaiseHazard getHazards={getHazards} raiseHazard={raiseHazard} setRaiseHazard={setRaiseHazard} />}
     <div className="flex justifyBetween mb-lg">
        <h2>Hazards</h2>
        <Button onClick={() => setRaiseHazard(true)} type="primary">
          Raise a hazard
        </Button>
      </div>
    <Table loading={!hazards} columns={HazardColumns} dataSource={hazards} />
    </>
  )
}

export default Hazard