import React, { useContext, useEffect } from 'react'
import { Group, Button } from '@mantine/core'
import AppContext from '../../../context/AppContext'

const DTCButtons = ({ setStatus, setMsg }) => {
  const { socket, setDTCs } = useContext(AppContext)

  useEffect(() => {
    const handleDTCs = (dtcs) => {
      console.log(dtcs);
      setMsg(dtcs.Status);
      setDTCs(dtcs.Data);

      setTimeout(() => {
        setMsg(null);
      }, 3000);
    };

    socket.on('dtcs', handleDTCs);

    return () => {
      socket.off('dtcs', handleDTCs);
    };
  }, [socket, setDTCs]);


  const getDTCs = () => {
    setStatus('getting')
    socket.emit('get_dtc', "getting dtcs..")
  }




  return (
    <Group position='center'>
      <Button color='red' onClick={getDTCs}>Get DTCs</Button>
      <Button color='red'>Clear DTCs</Button>
    </Group>
  )
}

export default DTCButtons
