import React from 'react'
import { useEffect } from "react"
import { useState } from "react";
import axios from "axios";


export const Homepage = () => {


  // const [loading,setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setdata] = useState("")


  useEffect(() => {
    axios.get("http://localhost:8080/users").then((res) => {
      console.log(res.data);
      setdata(res.data);
    })
  }, []);

  return (
    <div>
      <div>
        <h1>Account Details </h1>
        {/* {
                loading && "Loading....."
            }
            {
                error && "something went wrong...."
            } */}
        {
          data && data.length > 0 && data.map((note) => {
            return (
              <div>
                <p>Account No : {note._id}</p>
                <p>Email Address : {note.email}</p>
                <p>firstName : {note.firstName}</p>
                <p>lastName : {note.lastName}</p>
                <hr />
              </div>
            )
          })
        }

      </div>

    </div>
  )



}



