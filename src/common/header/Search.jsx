import { useNotification } from "@web3uikit/core";
import { ConnectWallet } from "@web3uikit/web3";

// import ConnectButton from "@web3uikit/web3";

import React from "react"
// ConnectButton
// import logo from "../../components/assets/images/logo.svg"
import { Link } from "react-router-dom"
// import { ConnectButton } from "web3uikit";
// ConnectWallet

const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })


  const dispatch2 = useNotification();

  const handleNewNotification = () => {
    dispatch2({
        type: "info",
        message: "message",
        title: 'New Notification',
        icon: "arrowCircleDown",
        position: 'bottomR',
    });
  };

  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <h2>Shopweb3</h2>
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>
          <ConnectWallet />
          <div className='icon f_flex width'>
            {/* <button onClick={handleNewNotification}>connect</button> */}
            
          {/* <ConnectButton  moralisAuth= {false}/> */}
            <i className='fa fa-user icon-circle'></i>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                <span>{CartItem.length === 0 ? "" : CartItem.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Search
