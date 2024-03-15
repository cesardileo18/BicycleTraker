import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import "../Scss/ScrollButton.scss";

const ScrollButton: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const toggleVisible = (): void => {
        const scrolled: number = document.documentElement.scrollTop;
        if (scrolled > 100) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    return (
        <div className='scrollButton'>
            <FontAwesomeIcon icon={faCaretUp} onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }} />
        </div>
    );
};

export default ScrollButton;
