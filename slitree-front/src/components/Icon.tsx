import { icons, LucideProps } from 'lucide-react'

export type IconName = keyof typeof icons

interface IconProps extends LucideProps {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = icons[name]

  return <LucideIcon {...props} />
}
