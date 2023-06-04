import axios,{AxiosResponse} from 'axios';

export async function fetchData():Promise<AxiosResponse>   {
  const response = await axios.get('http://localhost:5000/USER_DETAILS')
  return response.data
} 