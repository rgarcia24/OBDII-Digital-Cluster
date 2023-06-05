import React, { useContext, useEffect } from 'react'
import { Group, Button } from '@mantine/core'
import AppContext from '../../../context/AppContext'

const DTCButtons = ({ setStatus, setMsg }) => {
  const { socket, setDTCs } = useContext(AppContext)

  useEffect(() => {
    const handleDTCs = (dtcs) => {
      console.log(dtcs)
      setMsg(dtcs.Status);
      setDTCs(dtcs.Data);

      setTimeout(() => {
        setMsg(null);
      }, 3000);
    };

    const handleClearedDTCs = (dtcs) => {
      setMsg(dtcs.Status);
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    };


    socket.on('dtcs', handleDTCs);
    socket.on('dtcs_cleared', handleClearedDTCs);

    return () => {
      socket.off('dtcs', handleDTCs);
      socket.off('dtcs_cleared', handleClearedDTCs);
    };
  }, [socket, setDTCs]);


  const getDTCs = () => {
    setStatus('getting')
    socket.emit('get_dtc', "getting dtcs..")
  }

  const clearDTCs = () => {
    setStatus('getting')
    socket.emit('clear_dtcs', "clearing dtcs..")
  }





  return (
    <Group position='center'>
      <Button color='red' onClick={getDTCs}>Get DTCs</Button>
      <Button color='red' onClick={clearDTCs}>Clear DTCs</Button>
    </Group>
  )
}

export default DTCButtons
