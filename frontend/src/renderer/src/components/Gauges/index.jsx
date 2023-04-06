import React, { useEffect, useState } from "react";
import io from 'socket.io-client'
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
  DangerPath,
} from 'react-speedometer';
import { Group, Space } from '@mantine/core'


const socket = io('ws://localhost:5000', { transports: ['websocket'] })

const Guages = () => {
  const [data, setData] = useState({ speed: 0, rpm: 0 });

  const resetGuages = () => {
    setData(prevData => ({ ...prevData, speed: 0, rpm: 0 }));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      socket.emit('get_data', 'getting data');
    }, 1000);

    socket.on('data', newData => {
      console.log(newData)
      setData(prevData => ({ ...prevData, ...newData }));
    });
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      resetGuages();

    });

    return () => {
      clearInterval(timer);
      socket.off('data');
    };
  }, []);






  return (
    <>
      {/* <h1>Message From Socket Server</h1>
      <p>Speed MPH: {data.speed}  RPM: {data.rpm}</p> */}
      <Group position="center" spacing="xl" >
        <Speedometer
          value={data.speed}
          fontFamily='sans-serif'
          accentColor="#2e2f34"
          width={400}
          angle={300}
          rotation={180}
          min={0}
          max={220}

        >
          <Background />
          <Arc color="#2e2f34" opacity={0.5} />
          <Needle color="#ff6358" offset={15} />
          <Progress color="#ff6358" arcWidth={50} opacity={0.5} />
          <Marks numbersRadius={25} />
          <Indicator fontWeight="bold" >
            {(value, textProps) => (
              <text
                {...textProps} // textProps has the "transform" property only
                fontSize={30}
                x={165}
                y={300}
                fill="white"
                opacity={0.5}
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {value} MPH
              </text>
            )}
          </Indicator>
        </Speedometer>
        <Space w="md" />
        <Space w="md" />
        <Speedometer
          value={data.rpm}
          fontFamily='sans-serif'
          accentColor="#2e2f34"
          min={0}
          max={7000}
          width={400}
          angle={300}
          rotation={180}

        >
          <Background />
          <Arc color="#2e2f34" opacity={0.5} />
          <Needle color="#ff6358" offset={15} />
          <Progress color="#ff6358" arcWidth={50} opacity={0.5} />
          <Marks step={500} numbersRadius={25} />
          <Indicator fontWeight="bold" >
            {(value, textProps) => (
              <text
                {...textProps} // textProps has the "transform" property only
                fontSize={30}
                x={160}
                y={300}
                fill="white"
                opacity={0.5}
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                {value} RPM
              </text>
            )}
          </Indicator>
          <DangerPath />
        </Speedometer>
      </Group>
      {/* Speedometer with background */}
      {/* <Speedometer
        value={data.speed}
        fontFamily='sans-serif'
        accentColor="#2e2f34"
        width={300}
        angle={300}

        min={0}
        max={220}

      >
        <Background color="grey" opacity={0.2} />
        <Arc color="white" opacity={0.8} />
        <Needle color="#ff6358" offset={15} />
        <Progress color="#ff6358" />
        <Marks numbersRadius={25} lineOpacity={0.5} />
        <Indicator />
      </Speedometer> */}
    </>
  );
};
export default Guages;
