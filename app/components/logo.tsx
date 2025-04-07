import { IconCards } from '@tabler/icons-react'

export function Logo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white gap-2 `}>
      <span>
        <IconCards className="h-12 w-12 rotate-[15deg]"/>
      </span>
      <p className="text-[24px] md:text-[44px]">Card Management</p>
    </div>
  )
}
