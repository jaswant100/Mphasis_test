import type { NextPage } from 'next'
import Head from 'next/head'

import ColumnGroupingTable from '../features/table/table'
import styles from '../styles/Home.module.css'

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <ColumnGroupingTable/>
    </div>
  )
}

export default IndexPage
