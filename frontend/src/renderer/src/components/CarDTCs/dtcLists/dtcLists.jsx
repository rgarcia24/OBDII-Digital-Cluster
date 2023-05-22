import { ScrollArea, Table, createStyles } from '@mantine/core'
import React, { useState } from 'react'

import "./styles.css"


const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    transition: 'box-shadow 150ms ease',
    backgroundColor: "#fa5252",
    bottom: 0,
    color: "white",
    '&::after': {
      borderBottom: "solid 1px #fa5252",
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0
    },
    '& th': {
      color: "white !important",
      fontFamily: "sans-serif ",
      fontWeight: "bold",
    }
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },

}));




const DTCList = () => {
  const [scrolled, setScrolled] = useState(false);
  const { classes, cx } = useStyles();


  const data = [{
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  }, {
    code: "P234",
    description: "Faulty Sensor"
  },]

  const rows = data.map((row) => {
    return (
      <tr className='dtclist-row'>
        <td className='dtclist-td'>{row.code}</td>
        <td className='dtclist-td'>{row.description}</td>
      </tr>
    )
  })


  return (
    <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table miw={700} bgcolor='#2e2f34' horizontalSpacing="xl">
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr className='dtclist-thead-tr'>
            <th>Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}

export default DTCList
