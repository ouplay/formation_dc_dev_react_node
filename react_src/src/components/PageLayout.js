import React from 'react';
import './PageLayout.css';

const PageLayout = (props) => {
    return <div className={`page-layout ${props.className}`}>
        {props.children}
    </div>
}

export default PageLayout;