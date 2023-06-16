import React from 'react';
import ClassCard from '../../Shared/ClassCard/ClassCard';

const ApprovedClasses = ({ classes, refetch, featured }) => {
    return (
        <section>
            <div className="my-container grid grid-cols-1 xl:grid-cols-3 gap-10 mt-20">
                {
                    classes?.map(cls => <ClassCard featured={featured} key={cls._id} cls={cls} refetch={refetch}></ClassCard>)
                }
            </div>
        </section>
    );
};

export default ApprovedClasses;