import { useNotification } from "@web3uikit/core"
import { ethers } from "ethers"
import React from "react"
import { useState } from "react"
import { CONTRACT_ADDRESS, abi } from "../../constants"
import "./style.css"

const Cart = ({ CartItem, addToCart, decreaseQty }) => {
 
  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)
  const [cartName, setCartName] = useState([])
  const [cartId, setCartId] = useState([])

  const dispatch2 = useNotification();
  const handleNewNotification = (info, message) => {
    dispatch2({
        type: info,
        message: message,
        title: 'New Notification',
        icon: "arrowCircleDown",
        position: 'bottomR',
    });
  };


  const handleSubmit = async()=>{
    // console.log(CartItem)

    // CartItem.map((cart)=>{
      

    //  setCartName(cartName => [...cartName, cart.name])
    //   // console.log(cart.name.split(" "))
    //   console.log(cartName)
    // })
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      console.log(contract)

      // const txn = await contract.payment()

       CartItem.map((cart)=>{
      

      // console.log(cart.name)

     setCartId(cartId => [...cartId, ethers.utils.parseEther(`${cart.id}`)])
     

      const abiCoder = new ethers.utils.AbiCoder(  )

      // console.log(ethers.utils.id("hello world guys i love you so much"))
      // console.log(ethers.utils.toUtf8Bytes("hello world i want you guys").toString())
 
    setCartName(cartName => [...cartName, ethers.utils.id(`${cartName}`)])
    //   // console.log(cart.name.split(" "))
      console.log(cartName)

   


    })

     const txn = await contract.payment(cartId, cartName, {value: ethers.utils.parseEther("0.001")})
     handleNewNotification("info", "pending")

     txn.wait()
     handleNewNotification("info", "compeleted")

    


    // const txn = await contract.payment()
    } catch (error) {
      handleNewNotification("error", `${error.message}`)
      console.log(error)

    }
  }



  // prodcut qty total
  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>

          <div className='cart-details'>
            {CartItem.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}

            {CartItem.map((item) => {
              const productQty = item.price * item.qty

              return (
                <div className='cart-list product d_flex' key={item.id}>
                  <div className='img'>
                    <img src={item.cover} alt='' />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.name}</h3>
                    <h4>
                      ${item.price}.00 * {item.qty}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCart'>
                        <i className='fa-solid fa-xmark'></i>
                      </button>
                    </div>
                  
                    <div className='cartControl d_flex'>
                      <button className='incCart' onClick={() => addToCart(item)}>
                        <i className='fa-solid fa-plus'></i>
                      </button>
                      <button className='desCart' onClick={() => decreaseQty(item)}>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                    </div>
                  </div>

                  <div className='cart-item-price'></div>
                </div>
              )
            })}
          </div>

          <div className='cart-total product'>
            <h2>Cart Summary</h2>
            <div className=' d_flex'>
              <h4>Total Price :</h4>
              <h3>${totalPrice}.00</h3>
            </div> 
            <div className="buyButton">
              {totalPrice !== 0 && (<button onClick={handleSubmit}>Submit</button>)}
            </div>
          </div>

         
        </div>
      </section>
    </>
  )
}

export default Cart