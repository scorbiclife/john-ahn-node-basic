import { SignupForm } from './SignupForm'

export default {
  title: 'Auth/SignupForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export const Default = {
  render: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <SignupForm />
    </div>
  ),
}

export const WithMockAPI = {
  render: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <SignupForm />
    </div>
  ),
  parameters: {
    mockData: [
      {
        url: '/api/user/signup',
        method: 'POST',
        status: 201,
        response: {},
      },
    ],
  },
}
