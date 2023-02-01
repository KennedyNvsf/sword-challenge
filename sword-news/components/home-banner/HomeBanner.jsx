import React from "react";
import Image from "next/image";
import { useStateContext } from '../../context/StateContext';
import useAuthStore from "../../store/authStore";
//images
import bannerImg from "../../assets/banner.jpg";



const HomeBanner = () => {

    const {darkMode} = useStateContext();
    const {userProfile} = useAuthStore();

    return(

        <div className = "banner-container">
             
            <div className ="banner-labels-container">

                <div className="title">

                    {userProfile?.userRole === 'administrator' ? (
                        <h2 
                            style={{ color: darkMode? 'white': '#44403c' }}
                            className="banner-title"
                        >
                            Our admin <span>Portal.</span>
                        </h2>
                    ):(
                        <h2 
                            style={{ color: darkMode? 'white': '#44403c' }}
                            className="banner-title"
                        >
                            Stay updated on Sword Health latest <span>news.</span>
                        </h2>
                    )}
                </div>

                <p
                    style={{ color: darkMode? 'whitesmoke': '#44403c' }}
                    className='banner-p'
                >
                    Never miss anything regarding our case studies, reports, new advancements
                    on our technologies and so much more
                </p>

                <button>Explore</button>
            </div>

            {userProfile?.userRole !== 'administrator' && (
                <div className="banner-image-container">
                    <Image  
                        src= {bannerImg} 
                        alt="banner" 
                    />
                </div>
            ) }

            

                
        </div>
       
    )
}

export default HomeBanner;