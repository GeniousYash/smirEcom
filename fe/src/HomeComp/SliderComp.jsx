import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// images
import sl1 from "../assets/images/sl-1.png"
import sl2 from "../assets/images/sl-2.png"
import sl3 from "../assets/images/sl-3.png"

function SliderComp() {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    };
    return (
        <div className="slider-container w-full h-[100vh] border-2 border-[#000] overflow-hidden z-0">
            <Slider {...settings} className="w-full h-[90%]">
                <div className="w-full h-[100%] overflow-hidden relative bg-red">
                    <img src={sl1} alt="sl-1" />
                    <div className="absolute top-[20%] w-[45%] h-[50%] left-[5%]">
                        <h1 className="text-6xl">SMIR-Banner-Section-1</h1>
                        <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere perferendis enim iusto earum incidunt. Nihil blanditiis pariatur quo veniam, cumque corporis error quaerat commodi! Modi sapiente dicta sed provident expedita?</p>
                        <p className="text-4xl text-[#e5a652]">20% OFF /-</p>
                    </div>
                </div>
                <div className="w-full h-[100%] overflow-hidden relative bg-red">
                    <img src={sl2} alt="sl-2" />
                    <div className="absolute top-[20%] w-[45%] h-[50%] left-[5%]">
                        <h1 className="text-6xl">SMIR-Banner-Section-2</h1>
                        <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere perferendis enim iusto earum incidunt. Nihil blanditiis pariatur quo veniam, cumque corporis error quaerat commodi! Modi sapiente dicta sed provident expedita?</p>
                        <p className="text-4xl text-[#e5a652]">30% OFF /-</p>
                    </div>
                </div>
                <div className="w-full h-[100%] overflow-hidden relative bg-red">
                    <img src={sl3} alt="sl-3" />
                    <div className="absolute top-[20%] w-[45%] h-[50%] left-[5%]">
                        <h1 className="text-6xl">SMIR-Banner-Section-3</h1>
                        <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere perferendis enim iusto earum incidunt. Nihil blanditiis pariatur quo veniam, cumque corporis error quaerat commodi! Modi sapiente dicta sed provident expedita?</p>
                        <p className="text-4xl text-[#e5a652]">40% OFF /-</p>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default SliderComp;
