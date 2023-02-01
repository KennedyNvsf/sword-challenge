import React, {useEffect, useState}  from 'react'
import Image from 'next/image';
import {client} from "../../lib/sanity-client";
import {useRouter} from "next/router";

const PostEditor = ({
    title, 
    description, 
    creator,
    slug,
    tag,
    block,
    id
}) => {

    const [postTitle, setPostTitle] = useState('');
    const [postDesc, setPostDesc] = useState('');
    const [postId, setPostId] = useState('');
    const [imageAsset, setImageAsset] = useState();
    const [loading, setLoading] = useState(false);
    const [wrongImageType, setWrongImageType] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        setPostTitle(title);
        setPostDesc(description);
        setPostId(id);
    }, []);

    const uploadImg = (e) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['image/png', 'image/svg', 'image/jpeg', 'image/gif', 'image/tiff'];
        // uploading asset to sanity
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
              alert(error.message);
            });
        } 
    };

    const onEditPost = async () => {

        const document = {
            _id: id,
            _type: "post",
            title: postTitle,
            description: postDesc,
            slug: {
                _type: "slug",
                current: slug,
            },
            postCreator: creator,
            mainImage: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: imageAsset?._id,
                },
            },
            tags: tag,
            body: block
        }

        
        await client.fetch(
            `
            *[_type == "post" && slug == "${postId}"] {
                ...,
            }
            `
        ).then((data) => {
            client.createOrReplace(document).then(() => {
                navigate.push('/')
            })
            
        })
            
          
    }

  return (
    <div className='edit-post-container'>
        
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

        <div className='upload-image-container'>
            <h3 style={{color: '#FF585A'}}>Upload Post Image</h3>
            <input
                type="file"
                name="upload-video"
                className="video-upload-input"
                onChange={uploadImg}
            />
            {imageAsset && <Image src={imageAsset?.url} width={150} height={150}/>}
        </div>

      
        <button
            onClick={onEditPost}
            type='button'
            className='post-btn'
        >
           Update
        </button>
    </div>
  )
}

export default PostEditor;