import React, {Fragment} from 'react';
//sanity
import { groq } from 'next-sanity';
import {client} from "../lib/sanity-client";
//components
import {HomeBanner, BlogList} from "../components";




export default function Home({posts}) {
  
  return (
    <Fragment>
      <HomeBanner/>
      <BlogList posts={posts}/>
    </Fragment>
  )
}

export const getServerSideProps = async () => {
  const dataQuery = groq`
  *[_type=='post'] {
      ...,
      author->,
      categories[]->
  } | order(_createdAt, desc)
  `;

  const posts = await client.fetch(dataQuery);
  
  return {
    props: {posts}
  }
}
