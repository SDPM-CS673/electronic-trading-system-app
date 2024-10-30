import React from 'react';

export const About = () => {
    return (
        <section id='about' className='min-h-screen w-full bg-gray-900 text-gray-300 py-16 px-8'>
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row gap-8'>
                {/* About Us Section - Larger Box */}
                <div className='about-section p-8 rounded-lg bg-gray-800 flex-1'>
                    <h3 className='text-2xl mb-4 text-gray-100'>About Us</h3>
                    <p className='text-base leading-relaxed'>
                        Unitrade is a dynamic and forward-thinking trading platform designed to cater to the needs of traders at all levels. Whether you are a novice looking to make your first trade or a seasoned professional, our platform is built to provide intuitive, powerful, and reliable solutions. We combine cutting-edge technology with real-time market data, advanced trading tools, and secure transaction protocols to help users navigate the financial markets with confidence. At Unitrade, we believe in democratizing access to trading and promoting financial growth and education for our users. Our goal is to build a global community of empowered traders who thrive in today's ever-evolving financial landscape.
                    </p>
                </div>

                {/* Right Side - Stacked Vision and Mission Sections */}
                <div className='flex flex-col gap-8 md:w-1/2'>
                    <div className='about-section p-8 rounded-lg bg-gray-800'>
                        <h3 className='text-2xl mb-4 text-gray-100'>Vision</h3>
                        <p className='text-base leading-relaxed'>
                            To revolutionize global financial markets by empowering traders of all levels with cutting-edge technology, seamless access, and data-driven insights for smarter, faster, and more secure trading experiences.
                        </p>
                    </div>
                    <div className='about-section p-8 rounded-lg bg-gray-800'>
                        <h3 className='text-2xl mb-4 text-gray-100'>Mission</h3>
                        <p className='text-base leading-relaxed'>
                            At Unitrade, our mission is to provide an innovative and user-centric trading platform that simplifies the complexities of financial markets. We aim to offer a comprehensive suite of tools that enhance market access, facilitate informed decision-making, and deliver exceptional trading opportunities for both beginners and professionals. Our commitment is to ensure transparency, security, and a seamless user experience while promoting financial literacy and inclusion worldwide.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
