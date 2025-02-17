import axios from "axios";
import { useEffect, useState } from "react";

const useVisa = () => {

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
            const resdb =await axios.get(`/api/visa-form/get-by-agent`);
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
        getData();

    }, [re])


    return [data,Loading,error,reload]
}

export default useVisa