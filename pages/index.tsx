import Image from 'next/image'
import { useState } from 'react'
import supabase from '/pages/supabase.tsx'

export async function getStaticProps() {
  const { data } = await supabase.from('images').select('*').order('id', { ascending: false })
  return {
    props: {
      images: data,
    },
  }
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Gallery({ images }) {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

      <Image
        src="http://www.zafer.av.tr/wp-content/uploads/2021/03/ZAFERHUKUKPSDsonlogo2.png"
        alt="Logo"
        width={96}
        height={96}
        className="mr-2"
      />
      <p className="text-xl"> Zafer Hukuk Bürosu</p>
      <p className="font-bold text-2xl mb-8 text-center">Av.Mustafa Zafer Yayınları
  </p>



      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  )
}

function BlurImage({ image }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <a href={image.href} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-75',
            isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>


      <h3 className="mt-1 text-lg font-medium text-gray-900">{image.name.toLocaleUpperCase('tr-TR')}</h3>


    </a>
  )
}
