import { useEffect, useState} from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    console.log("useFetch被觸發了，我放上面")
    useEffect(() => {
        console.log("useFetch被觸發了")
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (err) {
                setError(err)
            }
            setLoading(false);
        }
        fetchData();
    }, [])
    console.log("useFetch被觸發了，我放下面")
    return {data, loading, error}
}

export default useFetch;