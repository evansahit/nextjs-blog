import Head from 'next/head'

import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'
import { getFeaturedPosts } from '../helper/posts-util'

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Next.js Blog</title>
        <meta
          name='description'
          content='This blog has been developed with Next.js'
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  )
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts()

  return {
    props: {
      posts: featuredPosts,
    },
  }
}
