import type { NextPage } from 'next'
import SimpleAccordion from '../../features/components/accordian'
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectData,
  fetchdataAsync,
} from '../../features/components/tableSlice'
import { useEffect } from 'react'
import RowAndColumnSpacing from '../../features/components/boxgrid'
import Layout from './layout';

const Page: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  const id = query.id;
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectData);
  let rows = data?.users.filter((data2: any) => data2.id == id)
  useEffect(() => {
    //dispatch(fetchdataAsync()) // for refresh page
  }, []);
  return (
    <Layout>
      <RowAndColumnSpacing rows={rows} />
      <SimpleAccordion rows={rows} />
    </Layout>
  )
}
export default Page;