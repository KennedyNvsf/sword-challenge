import React, {useState, useEffect} from 'react';
import { useStateContext } from '../../context/StateContext';

//components
import BlogListItem from './BlogListItem';



export const revalidate = 30;

const BlogList = ({posts}) => {

  const [blogs, setBlogs] = useState([]);
  const [filterBlog, setFilterBlog] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const {darkMode} = useStateContext();

  useEffect(() => {
    setBlogs(posts);
    setFilterBlog(posts);
  }, []);

  const handleBlogFilter = (item) => {
    setActiveFilter(item);
    setTimeout(() => {
      if (item === 'All') {
        setFilterBlog(blogs);
      } else {
        setFilterBlog(posts.filter((blog) => blog.tags.includes(item)));
        
      }
    }, 500);
  };

  return (
    <div>
      <div className='blog-filter-container'>
          <h4 style={{ color: darkMode? 'white': '#44403c' }}>Categories</h4>
          <div className="blog-filter">
              {['News', 'Blog', 'Partners', 'Help', 'All'].map((item, index) => (
              <div
                  key={index}
                  onClick={() => handleBlogFilter(item)}
                  className={`blog-filter-item app__flex ${activeFilter === item ? 'item-active' : ''}`}
              >
                  {item}
              </div>
              ))}
          </div>
      </div>

      <div className='blog-list-wrapper'>
          {filterBlog.map((post, index) => (
              <BlogListItem key={index} post={post}/>
          ))}
      </div>
    </div>
  )
}
  
export default BlogList;