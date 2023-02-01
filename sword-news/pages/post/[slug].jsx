import React,{useState} from "react";
import {useRouter} from "next/router";
import Image from 'next/image';
import { client } from '../../lib/sanity-client';
import urlFor from '../../lib/sanity-client';
import { useStateContext } from '../../context/StateContext';
import useAuthStore from "../../store/authStore";
import PostEditor from "../../components/post-editor/PostEditor";


export const revalidate = 60; //revalidate this date every 60 seconds


const BlogPost = ({post}) => {

    const {darkMode} = useStateContext();
    const {userProfile} = useAuthStore();
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const navigate = useRouter();

    const deletePost = async () => {

      const document = {
        id: post._id, 
      }

      await client.delete(post._id).then(() => {
          navigate.push('/')
      })
    }

    
    return (
        <article className='article-wrapper'>

          <section className='article-container'>
            <div className='article-header-wrapper'>
                <div className='article-header-container'>
                    <Image
                      className="article-header-img-main"
                      src={urlFor(post.mainImage).url()}
                      alt='header'
                      fill
                    />
                </div>

                <section className='article-header-label-wrapper'>
                </section>
            </div>

            <div className='article-header-label-container'>
              <div>

                <h1 
                  className='article-header-title-label'
                  style={{ color: darkMode? 'white': '#44403c' }}
                >
                  {post.title}
                </h1>

                <div className="article-header-author-container">
                  <div className='article-header-author-details-container'>
                    <h3 style={{ color: darkMode? 'white': '#44403c' }}>posted by {''} {post.postCreator}</h3>
                  </div>
                </div>

                <p className='article-header-date' style={{ color: darkMode? 'white': '#FF585A' }}>
                  {new Date(post._createdAt).toLocaleDateString('eng-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>

                <div className="blog-card-btn-container">
                    {(userProfile?.userRole === 'administrator' || userProfile?.userName === post.postCreator) && (
                      <button 
                        className='edit-btn'
                        onClick={() => setIsEditorOpen(!isEditorOpen)}
                      >
                        Edit Post
                      </button>
                    )}

                    {userProfile?.userRole === 'administrator' && (
                      <button className='edit-btn' onClick={deletePost}>
                        Delete Post
                      </button>
                    )}
                </div>
              </div>

              {(userProfile?.userRole === 'user' && userProfile?.userName !== post.postCreator) && (
                <button className='edit-btn'>
                  Save Post
                </button>
              )}

              {isEditorOpen && (
                <PostEditor 
                  title={post.title}
                  description={post.description} 
                  id={post._id} 
                  slug={post.slug.current}
                  creator={post.postCreator}
                  tag={post.tags}
                  block={post.body}
                />
              )}
            </div>  

          </section>

          <p 
            style={{ 
              color: darkMode? 'white': '#44403c', 
              marginTop: 50,
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            {post.body}
          </p>
        </article>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "post"] {
      slug {
        current
      }
    }
    `;
  
    const posts = await client.fetch(query);
  
    const paths = posts.map((post) => ({
      params: {
        slug: post.slug.current
      }
    }));
  
    return {
      paths,
      fallback: 'blocking'
    }
  }
  
  export const getStaticProps = async ({
    params: {
      slug
    }
  }) => {
    const query = `*[_type == "post" && slug.current == '${slug}'][0]`;
    const postsQuery = '*[_type == "post"]'
  
    const post = await client.fetch(query);
    const posts = await client.fetch(postsQuery);
  
    return {
      props: {
        posts,
        post
      }
    }
  }
  

export default BlogPost;