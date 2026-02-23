import { useMutation } from '@tanstack/react-query'
import { signup } from '@/api/user'

export function useSignup({ onSuccess } = {}) {
  return useMutation({
    mutationFn: signup,
    onSuccess,
  })
}
