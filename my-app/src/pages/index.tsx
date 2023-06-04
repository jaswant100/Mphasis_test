import type { NextPage } from 'next'
import ColumnGroupingTable from '../features/components/table'
import styles from '../styles/Home.module.css'
import { useAppSelector, useAppDispatch } from './../hooks'
import {
  fetchdataAsync,
  selectData,loadata
} from '../features/components/tableSlice'
import { useEffect } from 'react'
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import axios from 'axios'

export const getStaticProps: GetStaticProps<{
  repo: any;
}> = async () => {
  const response = await axios.get('http://localhost:5000/USER_DETAILS');
  const repo =response.data
  return { props:{repo}}
};

const IndexPage = ({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectData);
  useEffect(() => {
    dispatch(loadata(repo))
  }, []);
  return (
    <div className={styles.container}>
      <ColumnGroupingTable data={data}/>
    </div>
  )
}
export default IndexPage

