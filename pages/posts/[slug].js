import Head from 'next/head'

import PostContent from '../../components/posts/post-detail/post-content'
import { getPostData } from '../../helper/posts-util'
import { getPostFiles } from '../../helper/posts-util'

export default function PostDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </>
  )
}

export function getStaticProps(context) {
  const { params } = context
  const { slug } = params
  const postData = getPostData(slug)

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  }
}

export function getStaticPaths() {
  const postFileNames = getPostFiles()
  const slugs = postFileNames.map((post) => post.replace(/\.md$/, ''))

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  }
}
