import React, { useState } from 'react';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import videoBg from '../../../assets/images/video_bg.jpg'
import { FaPlay } from 'react-icons/fa';
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

const VideoSection = () => {

    const [open, setOpen] = useState(false)

    return (
        <section style={{ backgroundImage: `url(${videoBg})` }} className='py-24 flex flex-col items-center justify-center'>
            <SectionHeading heading={'watch our awesome video'} subHeading={'tour our camp'} whiteText={true} />
            <button onClick={() => setOpen(true)} className='bg-white text-[#fc5640] p-8 rounded-full text-[20px] ripple mt-10 mb-20'>
                <FaPlay />
            </button>
            <button className="my-btn">enroll now</button>
            <Lightbox
                plugins={[Video]}
                open={open}
                close={() => setOpen(false)}
                slides={[
                    {
                        type: "video",
                        width: 1280,
                        height: 720,
                        sources: [
                            {
                                src: "/public/video.mp4",
                                type: "video/mp4"
                            }
                        ]
                    },
                ]}
            />
        </section>
    );
};

export default VideoSection;