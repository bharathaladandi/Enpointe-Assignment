import React from 'react'
import { useEffect } from "react"
import { useState } from "react";
import axios from "axios";


export const Homepage = () => {


  // const [loading,setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setdata] = useState("")
  const [amount, setAmount] = useState('');


  useEffect(() => {
    axios.get("http://localhost:8080/users").then((res) => {
      console.log(res.data);
      setdata(res.data);
    })
  }, []);


  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };


  // const handleWithdrawal = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.post('http://localhost:8080/transaction/withdraw', { amount });
  //     console.log('Withdrawal successful');

  //   } catch (error) {

  //     console.error('Error occurred during withdrawal:', error);
  //   }
  // };

  const handleDeposit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/transaction/deposit', { amount });

      console.log('Deposit successful');
    } catch (error) {

      console.error('Error occurred during deposit:', error);
    }
  };

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

      <div>
        {/* <form onSubmit={handleWithdrawal}>
          <label>
            Withdrawal Amount:
            <input placeholder='Type Amount here' type="number" value={amount} onChange={handleAmountChange} />
          </label>
          <button type='submit'>Withdraw</button>
        </form> */}

        <form onSubmit={handleDeposit}>
          <label>
            Deposit Amount:
            <input placeholder='Type Amount here' type="number" value={amount} onChange={handleAmountChange} />
          </label>
          <button type="submit">Deposit</button>
        </form>
      </div>

    </div>
  )



}



