import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import urlFor from '../../lib/sanity-client';
import { useStateContext } from '../../context/StateContext';
import useAuthStore from "../../store/authStore";



function BlogListItem({post}) {
    const {darkMode} = useStateContext();
    const {userProfile} = useAuthStore();
    
  return (
    <div className='blog-list-item'>
        <div className="blog-cover-wrapper">
            <Image
                className='blog-cover'
                src={urlFor(post.mainImage).url()}
                alt='post author name'
                width={300}
                height={300}
            />
        </div>

        <div className='blog-brief-desc-container'>
            <h4 style={{ color: darkMode? 'white': '#44403c' }}>{post.title}</h4>
            <p style={{ color: darkMode? 'white': '#44403c' }}>
                {post.description}
            </p>

            <div className='blog-card-btn-container'>
                {userProfile ? (
                    <Link href={`/post/${post.slug.current}`}>
                        <button className='read-btn'>Read</button>
                    </Link>
                ) : (
                    <button className='read-btn'>Login to Read</button>
                )}
                
            </div>
        </div>

    </div>
  )
}

export default BlogListItem;