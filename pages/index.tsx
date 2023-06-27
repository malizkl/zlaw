import Image from 'next/image'
import { useState } from 'react'
import supabase from '../pages/supabase'

export async function getStaticProps() {
  const { data } = await supabase.from('images').select('*').order('id', { ascending: false })
  return {
    props: {
      images: data,
    },
  }
}


function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
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
      <div className="flex items-center mt-2">
              <svg
                className="w-6 h-6 mr-2 text-blue-400 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                />
              </svg>
              <p className="text-sm text-gray-700">{image.username}</p>
            </div>

      <h3 className="mt-1 text-lg font-medium text-gray-900">{image.name.toLocaleUpperCase('tr-TR')}</h3>


    </a>
  )
}
