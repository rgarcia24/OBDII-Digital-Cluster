import React, { useState } from 'react'
import DTCButtons from './dtcButtons/dtcButtons'
import DTCList from './dtcLists/dtcLists'
import { Space } from '@mantine/core'
import "./styles.css"

const CarDTCs = () => {

  const [status, setStatus] = useState("")
  const [msg, setMsg] = useState("")

  const renderDTCMessage = () => {
    if (status === 'getting') {
      return <p className="msg-status getting">{msg}</p>;
    } else if (status === 'success') {
      return <p className="msg-status success">{msg}</p>;
    } else if (status === 'error') {
      return <p className="msg-status error">{msg}</p>;
    }
    return null;
  };

  return (
    <>
      <DTCButtons setStatus={setStatus} setMsg={setMsg} />
      <Space h="xl" />
      <DTCList />
      {renderDTCMessage()}
    </>
  )
}

export default CarDTCs
