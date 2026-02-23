import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useSignup } from '@/hooks/useSignup'

export function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [validationError, setValidationError] = useState('')

  const mutation = useSignup({
    onSuccess: () => {
      setFormData({ username: '', email: '', password: '' })
    },
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (validationError) setValidationError('')
    if (mutation.isError) mutation.reset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.username || !formData.email || !formData.password) {
      setValidationError('All fields are required')
      return
    }

    if (formData.username.length > 50) {
      setValidationError('Username must be 50 characters or less')
      return
    }

    mutation.mutate(formData)
  }

  const errorMessage = validationError || mutation.error?.message

  if (mutation.isSuccess) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Account Created!</CardTitle>
          <CardDescription>
            Your account has been successfully created. You can now log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => mutation.reset()} className="w-full">
            Go to Login
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              disabled={mutation.isPending}
              maxLength={50}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={mutation.isPending}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={mutation.isPending}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating account...' : 'Sign up'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
