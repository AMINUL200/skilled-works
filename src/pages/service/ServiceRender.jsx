import React from 'react'
import { useParams } from 'react-router-dom';
import HRMSService from './HRMSService';

const ServiceRender = () => {
    const {slug} = useParams();

    if(slug === 'hrms-software'){
        return <HRMSService />;
    }


    return <div>Service Not Found</div>;
}

export default ServiceRender
