import { Link } from "react-router-dom";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import "./hide.css"

const ImageClipBox = ({ src, clipClass }) => (
    <div className={clipClass}>
        <img src={src} />
    </div>
);

const Contact = () => {
    return (
        <div id="contact" className="my-20 min-h-96 w-screen  px-10">
            <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
                <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
                    <ImageClipBox
                        src="/prodimg/img10.png"
                        clipClass="contact-clip-path-1 -ml-[5vw]"
                    />
                    <ImageClipBox
                        src="/prodimg/img9.png"
                        clipClass="contact-clip-path-2 -mt-[10vh] lg:translate-y-0 translate-y-0"
                    />
                </div>

                <div className="absolute -top-20 left-32 w-60 sm:top-3/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
                    <ImageClipBox
                        src="/prodimg/img1.png"
                        clipClass="absolute md:scale-85"
                    />
                    <ImageClipBox
                        src="/prodimg/img1.png"
                        clipClass="sword-man-clip-path md:scale-85"
                    />
                </div>

                <div className="flex flex-col items-center text-center">
                    <p className="joinsmir mb-10 font-general text-[20px] uppercase">
                        Join SMIR
                    </p>

                    <AnimatedTitle
                        title="let&#39;s R<b>e</b>create the<br /> era of f<b>a</b>shion <br /> t<b>o</b>gether."
                        className="special-font !md:text-[20px] w-full font-zentry lg:text-5xl !leading-[.9]"
                    />

                    <Link to="/contact"><Button title="contact us" containerClass="mt-10 cursor-pointer" /></Link>
                </div>
            </div>
        </div>
    );
};

export default Contact;
