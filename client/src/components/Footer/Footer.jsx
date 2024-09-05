import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return  (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
             <img src={assets.logo} alt="" />
             <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, minus autem? Sequi repellat perspiciatis illo reprehenderit quidem? Vel recusandae alias aspernatur, eligendi, expedita esse omnis sint minus numquam consectetur consequatur.</p>
             <div className='footer-social-icons'>
                 <img src={assets.facebook_icon} alt="icons" />
                 <img src={assets.twitter_icon} alt="icons" />
                 <img src={assets.linkedin_icon} alt="icons" />
             </div>
        </div>
        <div className='footer-content-center'>
             <h2>COMPANY</h2>
             <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
             </ul>
        </div>
        <div className='footer-content-right'>
             <h2>GET IN TOUCH</h2>
             <ul>
              <li>+0081993993</li>
              <li>caaf@gmail.com</li>
             </ul>
        </div>
        

      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 @ Rahat_kitchen.com  All Right Reserved</p>
    </div>
  )
}

export default Footer