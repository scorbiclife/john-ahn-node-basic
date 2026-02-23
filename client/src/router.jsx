import { createRouter, createRoute, createRootRoute, redirect, Outlet } from '@tanstack/react-router'
import { LoginForm } from '@/components/LoginForm'
import { SignupForm } from '@/components/SignupForm'

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Outlet />
    </div>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/login' })
  },
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginForm,
})

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignupForm,
})

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, signupRoute])

export const router = createRouter({ routeTree })
