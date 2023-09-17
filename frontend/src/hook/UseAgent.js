/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import axios from 'axios'


const useAgent = () => {
  const [loading, SetLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [re, setRe] = useState(1);
  const [error,setErro] = useState(false);

  const reload = () => {
    setRe((e) => {
      return e + 1
    })
  }



  useEffect(() => {
    if (loading) {
      return
    }
    const getData = async ()=>{
      try {
        const serverRes = await axios.get("/api/admin/get-all-agent");
        if(serverRes.status === 200){
          setdata(serverRes.data);
        }
        setErro(false);
        SetLoading(false)
      } catch (error) {
        console.log("🚀 ~ file: UseAgent.js:22 ~ getData ~ error:", error);
        setErro(error);
        SetLoading(false)
      }
    }
    SetLoading(true);
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [re])


  return {
    error,
    reload,
    data,
    loading
  }
}

export default useAgent