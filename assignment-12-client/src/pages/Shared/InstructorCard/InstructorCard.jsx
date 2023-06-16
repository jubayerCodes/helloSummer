import React from 'react';

const InstructorCard = ({ instructor }) => {

    const { name, photo, email, classes, students } = instructor

    return (
        <div className={`card w-full bg-base-100 shadow-xl`}>
            <figure><img src={photo} alt="class" className='h-[350px] w-full' /></figure>
            <div className="card-body gap-0">
                <h2 className="card-title mb-3">{name}</h2>
                <p>Email: {email}</p>
                <p>Classes: {classes}</p>
                <p>Total Students: {students}</p>
            </div>
        </div>
    );
};

export default InstructorCard;