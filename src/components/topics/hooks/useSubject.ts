import axios from "axios";
import { useState, useEffect } from 'react';
import { subjectInterface } from "../../Subjects/models/subject";

type res = {
    subject: undefined | subjectInterface,
    loading: boolean,
    error: boolean
}

export const useSubject = (url: string) => {
    const [req, setReq] = useState<res>({
        subject: undefined,
        loading: true,
        error: false
    });

    const getData = async () => {
        const res = await axios.get(url);
        const data: subjectInterface = await res.data;
        setReq({
            subject: data, loading: false, error: false
        });
    }

    useEffect(() => {
        getData();
    }, [url])


    return req;
};