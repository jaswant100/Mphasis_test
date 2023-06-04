import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import axios from 'axios'

export const getStaticProps: GetStaticProps<{
  repo: any;
}> = async () => {
  const response = await axios.get('http://localhost:5000/USER_DETAILS');
  //console.log(response)
  const repo =response.data
  return { props:{repo}}
};
export async function fetchData({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>)  {
  //console.log(repo)
  //const response = await axios.get('http://localhost:5000/USER_DETAILS')
  return repo
}
