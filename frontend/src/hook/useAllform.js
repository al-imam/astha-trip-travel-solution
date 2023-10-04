import axios from "axios";
import { useEffect, useState } from "react"


const useAllform = (country) => {

    const [data, setData] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [re, SetRe] = useState(1);

    const reload = () => {
        SetRe((e) => {
            return e + 1;
        })
    }

    const getData = async (c) => {
        try {
            const resdb =await axios.get(`/api/visa-form/get-${c}`);
            setData(resdb.data);
            setLoading(false);
        } catch (error) {
            console.log("🚀 ~ file: useAllform.js:14 ~ getData ~ error:", error)
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(Loading){
            return
        }
        setLoading(true);
        getData(country);

    }, [re,country])


    return [data,Loading,error,reload]
}

export default useAllform