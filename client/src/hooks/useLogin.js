import { useMutation } from '@tanstack/react-query'
import { login } from '@/api/user'

export function useLogin({ onSuccess } = {}) {
  return useMutation({
    mutationFn: login,
    onSuccess,
  })
}
