import { useEffect, useState } from "react";

const useSupabase = (fn: () => Promise<{ data: any[] }> ) => {
  const [data, setData] = useState<{ data: any[] }>({ data: [] });
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async() => {
    setIsLoading(true)
    try {
      const data = await fn();
      if (data) {
          setData(data)
      }
    } catch (error) {
      console.log(error)
    }finally{
        setIsLoading(false)
    }
  }

  useEffect(() =>{
     fetchData();
  }, [])

  const refetch = () => fetchData()

  return {data, isLoading, refetch}
}

export default useSupabase;