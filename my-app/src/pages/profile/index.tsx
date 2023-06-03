import SimpleAccordion from '../../features/components/profile'
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from '../../hooks'
import {
  selectData,
  fetchdataAsync,
} from '../../features/components/tableSlice'
import { useEffect, useState } from 'react'
export default function Page(){
    const router = useRouter();
    const query = router.query;
    const id = query.id;
    const dispatch = useAppDispatch()
    const data = useAppSelector(selectData);
    console.log(data)
    let rows = data?.users.filter((data2:any)=>data2.id == id)
    console.log(rows)
    useEffect(() => {
      dispatch(fetchdataAsync())
    }, []);
    return(
        <SimpleAccordion rows={rows}/>
    )
}