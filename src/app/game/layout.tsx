import { AuthProxy } from '@/components/AuthProxy'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProxy>
      {children}
    </AuthProxy>
  )
}
