import React from 'react';
import axios from "axios";

const getData = async () => {
    const baseUrl = "http://localhost:8080"
    try {
        return await axios.request({
            url: `${baseUrl}${"/resource/all"}`,
            method: "GET",
        })
    } catch (e) {
        const {
            response: {data},
        } = e
        return data
    }
}
export const Project = () =>{
    React.useEffect(()=> {
        getData().then(r => console.log(r));
    })
    return (
        <div> hi </div>
    );
}
