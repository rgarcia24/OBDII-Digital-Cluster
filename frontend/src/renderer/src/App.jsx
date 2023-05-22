import React from 'react'
import Gauges from './components/Gauges';
import { Space } from '@mantine/core';
import { AppProvider } from './context/AppContext';
import CarDTCs from './components/CarDTCs/carDTCs';

function App() {

  return (
    <AppProvider>
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Gauges />
      <Space h="xl" />
      <Space h="xl" />
      <CarDTCs />
    </AppProvider>
  )
}

export default App
