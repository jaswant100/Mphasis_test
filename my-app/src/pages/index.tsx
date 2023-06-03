import type { NextPage } from 'next'
import Head from 'next/head'

import ColumnGroupingTable from '../features/components/table'
import styles from '../styles/Home.module.css'
import { useAppSelector, useAppDispatch } from './../hooks'
import {
  fetchdataAsync,
  selectData,
} from '../features/components/tableSlice'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

const IndexPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectData);
  useEffect(() => {
    dispatch(fetchdataAsync())
  }, []);
  return (
    <div className={styles.container}>
      <ColumnGroupingTable data={data} />
    </div>
  )
}

export default IndexPage
