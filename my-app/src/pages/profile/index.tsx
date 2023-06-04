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

const Page: NextPage = () =>{
    const router = useRouter();
    const query = router.query;
    const id = query.id;
    const dispatch = useAppDispatch()
    const data = useAppSelector(selectData);
    let rows = data?.users.filter((data2:any)=>data2.id == id)
    useEffect(() => {
      dispatch(fetchdataAsync())
    }, []);
    return(
      <>
        <RowAndColumnSpacing rows={rows}/>
        <SimpleAccordion rows={rows}/>
        </>
    )
}
export default Page;