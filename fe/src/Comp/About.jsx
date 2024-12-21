import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import halfFull from "/videos/aboutvd.mp4"

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#clip",
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            },
        });

        clipAnimation.to(".mask-clip-path", {
            top: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
        });
    });

    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <p className="font-bold text-xl uppercase md:text-[10px]">
                    Welcome to SMIR
                </p>

                <AnimatedTitle
                    title="Disc<b>o</b>ver India's <br /> Best Fashion <b>B</b>rand"
                    containerClass="mt-5 !text-black text-center"
                />

                <div className="about-subtext">
                    <p className="text-gray-500">
                        Our bold and distinctive prints are crafted to stand out, blending modern aesthetics with timeless appeal.
                    </p>
                </div>
            </div>

            <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image">
                    <video
                        src={halfFull}
                        autoPlay
                        loop
                        muted
                        className="maskClipvdo absolute !left-0 !top-0 size-full object-cover mb-[30px]"
                    ></video>
                </div>
            </div>
        </div>
    );
};

export default About;
