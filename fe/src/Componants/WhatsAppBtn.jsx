import React from 'react'
import "./WhatsappBtn.css"
import whatsapplogo from "/icons/wb.png"

const WhatsAppBtn = () => {
    return (
        <div className='whatsappbtndiv w-[50px] h-[50px] fixed'>
            <a href='https://wa.me/919883374097?text=Hello,SMIR, Is Home Delivery is Available?' target='_blank'><img className='w-[100%] h-[100%]' src={whatsapplogo} alt="" /></a>
        </div>
    );
};

export default WhatsAppBtn
