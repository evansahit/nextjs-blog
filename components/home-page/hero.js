import Image from 'next/image'

import css from './hero.module.css'

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className={css.image}>
        <Image
          src='/images/site/compass.jpeg'
          alt='An image showing the blog owner'
          width={300}
          height={300}
        />
      </div>
      <h1>Next.js blog</h1>
      <p>This blog has been developed with Next.js</p>
    </section>
  )
}
