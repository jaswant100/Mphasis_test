"use client"
import Image from 'next/image'
import styles from './page.module.css'
import ColumnGroupingTable from './table'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type Repo = {
  name: string;
  stargazers_count: number;
};
 

export default function Home({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(repo)
  return (
    <main className={styles.main}>
     <ColumnGroupingTable/>
    </main>
  )
}
export const getServerSideProps: GetServerSideProps<{
  repo: Repo;
}> = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const repo = await res.json();
  //console.log(repo)
  return { props: { repo } };
};
