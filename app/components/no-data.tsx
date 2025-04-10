import Image from 'next/image'

interface NoDataProps {
  className?: string
}

export function NoData({ className }: NoDataProps) {
  return (
    <div className={className ? className : 'mt-20 p-6'}>
      <Image
        src={'/no-data.svg'}
        width={800}
        height={800}
        alt="Sem dados"
        className="w-[300px] m-auto"
      />
    </div>
  )
}
