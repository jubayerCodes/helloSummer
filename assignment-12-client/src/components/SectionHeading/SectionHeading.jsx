import React from 'react';

const SectionHeading = ({ subHeading, heading, whiteText }) => {

    return (
            <div className='mb-10 w-fit mx-auto'>
                {
                    subHeading && <div className="divider uppercase font-semibold text-base text-[#9abe29]">{subHeading}</div>
                }
                <h2 className={`${whiteText && 'text-white'} text-center text-3xl font-bold underline uppercase`}>{heading}</h2>
            </div>
    );
};

export default SectionHeading;