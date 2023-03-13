import Link from 'next/link'
import Image from 'next/image'
import css from './post-item.module.css'

export default function PostItem(props) {
  const { title, image, excerpt, date, slug } = props.post
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const imagePath = `/images/posts/${slug}/${image}`
  const linkPath = `/posts/${slug}`

  return (
    <li className={css.post}>
      <Link href={linkPath}>
        <div className={css.image}>
          <Image src={imagePath} alt={title} width={300} height={300} />
        </div>
        <div className={css.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  )
}
