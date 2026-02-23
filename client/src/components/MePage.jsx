import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useMe } from '@/hooks/useMe'

export function MePage() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useMe()

  useEffect(() => {
    if (isError) navigate({ to: '/login' })
  }, [isError, navigate])

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <p className="text-center text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>My Account</CardTitle>
        <CardDescription>Your account details</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          <span className="text-muted-foreground">Email: </span>
          {data.email}
        </p>
      </CardContent>
    </Card>
  )
}
