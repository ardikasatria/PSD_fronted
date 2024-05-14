import React from 'react';
import Typewriter from 'typewriter-effect';

const Banner = () => {
    return (
        <div className="banner-container py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
                        <bold className="text-sm-bold">Hello Everyone!</bold>
                        <h1 className="mt-3 mb-4">Welcome to <Typewriter
                            options={{
                                strings: ['Projek Sains Data', '"Diving into Data"'],
                                autoStart: true,
                                loop: true,
                            }}
                        /></h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
