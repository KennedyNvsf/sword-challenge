import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {client} from "../lib/sanity-client";
import {useRouter} from "next/router";
import axios from 'axios';
import useAuthStore from "../store/authStore";
import { tags } from '../utils/constants';


const  createPost = () => {
    const [loading, setLoading] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postDesc, setPostDesc] = useState('');
    const [postCreator, setPostCreator] = useState('');
    const [tag, setTag] = useState(tags[0].name);
    const [imageAsset, setImageAsset] = useState();
    const [wrongImageType, setWrongImageType] = useState(false);
    const [savingPost, setSavingPost] = useState(false);
    const [blogContent, setBlogContent] = useState('');

    const {userProfile} = useAuthStore();
    const navigate = useRouter();

    useEffect(() => {
        setPostCreator(userProfile.userName);
    }, [])


    const uploadImage = (e) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['image/png', 'image/svg', 'image/jpeg', 'image/gif', 'image/tiff'];
        // uploading img asset 
        if (fileTypes.includes(selectedFile.type)) {
          setWrongImageType(false);
          setLoading(true);
          client.assets
            .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
            .then((document) => {
              setImageAsset(document);
              setLoading(false);
            })
            .catch((error) => {
              console.log('Upload failed:', error.message);
            });
        } else {
          setLoading(false);
          setWrongImageType(true);
        }
    };


    //create post
    const handlePost = async () => {

        if (postTitle && postDesc && postCreator && tag && blogContent  && imageAsset?._id ) {
    
           setSavingPost(true);

          const document = {
            _type: 'post',
            title: postTitle,
            description: postDesc,
            slug: {
                _type: "slug",
                current: postTitle.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
            },
            postCreator,
            mainImage: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: imageAsset?._id,
                },
            },
            tags: tag,
            body: blogContent,
          };
    
          await axios.post(`http://localhost:3000/api/post`, document);
          
          navigate.push('/');
        }
      };

  return (
    <div className='upload-post-container'>
        <div className='upload-image-container'>
            <h3 style={{color: '#FF585A'}}>Upload Post Image</h3>
            <input
                type="file"
                name="upload-video"
                className="video-upload-input"
                onChange={uploadImage}
            />
            {imageAsset && <Image src={imageAsset?.url} width={150} height={150}/>}
        </div>
        
        <div className='post-input-container'>
            <label className="post-label">Post Title</label>
            <input
                type='text'
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className='post-input'
            />
        </div>

        
        <div className='post-input-container'>
            <label className="post-label">Description</label>
            <input
                type='text'
                value={postDesc}
                onChange={(e) => setPostDesc(e.target.value)}
                className='post-input'
            />
        </div>

        <div className='post-input-container'>
            <label className='post-label'>Choose tag</label>

            <select
                onChange={(e) => {
                setTag(e.target.value);
                }}
            >
                {tags.map((item) => (
                    <option
                        key={item.name}
                        value={item.name}
                    >
                        {item.name}
                    </option>
                ))}
            </select>
        </div>

        <div className='post-content-container'>
            <label className="post-label">Write Blog</label>
            <textarea
                value={blogContent}
                type='blockContent'
                onChange={(e) => setBlogContent(e.target.value)}
            />
        </div> 
                

        <span>Author: {postCreator}</span>
        <button
            // disabled={videoAsset?.url ? false : true}
            onClick={handlePost}
            type='button'
            className='post-btn'
        >
            {savingPost ? 'Posting...' : 'Post'}
        </button>
    </div>
  )
}

export default createPost;

// : postCreator.toLowerCase().replace(/\s+/g, '-').slice(0, 200),

