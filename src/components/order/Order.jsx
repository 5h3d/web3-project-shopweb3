import React from 'react'
import { ethers } from "ethers"
import { useState } from "react"
import { CONTRACT_ADDRESS, abi } from "../../constants"
import "./style.css"
import { useEffect } from 'react'

const Order = () => {
    const [transaction, setTransaction] = useState([])

    useEffect(()=>{
        getTransaction()
        
    },[])

   
    const getTransaction = async()=>{
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
            console.log("contract ", await contract)
            console.log("transaction ", await contract.customerTransactions())
            const customerTransactions =  await contract.customerTransactions()
            // console.log(customerTransactions.productsId)


            // customerTransactions.map((t)=>{
            //     console.log(t.productsName)
            //     t.productsName.map((tr)=>{
            //        console.log(tr._hex.toString())
            //     })
            // })

            // setTransaction(customerTransactions)



            console.log(customerTransactions)

            

            setTransaction(customerTransactions)

            transaction.map((trans)=>{
                console.log(trans.productName)
            })

            
        } catch (error) {
            
        }



    }
  return (
    <div className='order__page'>

        <div className="order__data">
            <table id="customers">
            <tr>
                <th>Id</th>
                <th>Time</th>
                <th>Product Name</th>
                <th>Price</th>
            </tr>
            {
                transaction.length > 0 && transaction.map((trans)=>(
               
            <tr>
                <td>1 </td>
                <td>{trans.time._hex.toString()}</td>
                <td>{trans.productsName.map((tr)=>(
                    <span>{tr}</span>
                ))}
                    
                </td>
                <td>{ethers.utils.formatEther(trans.Price._hex)}</td>
             </tr>
                ))
            }
          
            <tr>
                <td>2 </td>
                <td>March 11, 2022</td>
                <td>Germany Berglunds snabbköp</td>
                <td>250$</td>
            </tr>
           
           
       
           
            </table>
       </div>
    </div>
  )
}

export default Order