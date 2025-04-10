import Form from '@/app/components/form'

export default async function Page() {
  return (
    <div className="w-full h-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Nova compra</h1>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 md:mt-8 ">
        <Form />
      </div>
    </div>
  )
}
