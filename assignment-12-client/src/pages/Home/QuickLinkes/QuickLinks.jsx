import React from 'react';
import card1 from '../../../assets/images/home1_banner1-370x224.jpg'
import card2 from '../../../assets/images/home1_banner2-370x224.jpg'
import card3 from '../../../assets/images/home1_banner3-1-370x224.jpg'
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const QuickLinks = () => {
    return (
        <section className='py-24 bg-[#F6F5F2]'>
            <div className="my-container flex justify-between items-center gap-8">
                <div className='bg-[#9ABE29] quickLink-card'>
                    <img src={card1} alt="" />
                    <div>
                        <span>Photos</span>
                        <h3>VISIT GALLERY</h3>
                        <AnchorLink href="#gallery-section">
                            <button className="btn">More</button>
                        </AnchorLink>
                    </div>
                </div>
                <div className='bg-[#9ABE29] quickLink-card'>
                    <img src={card2} alt="" />
                    <div>
                        <span>Alumni</span>
                        <h3>STAY IN TOUCH</h3>
                        <AnchorLink href="#">
                            <button className="btn">More</button>
                        </AnchorLink>
                    </div>
                </div>
                <div className='bg-[#9ABE29] quickLink-card'>
                    <img src={card3} alt="" />
                    <div>
                        <span>Staff Positions</span>
                        <h3>JOIN THE TEAM</h3>
                        <AnchorLink href="#">
                            <button className="btn">More</button>
                        </AnchorLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuickLinks;