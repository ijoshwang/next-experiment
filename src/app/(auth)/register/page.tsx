import React from 'react'

import RegisterForm from './RegisterForm'

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-2 w-full p-6 sm:max-w-md justify-center mx-auto rounded-lg border shadow-sm">
      <h2 className="font-semibold tracking-tight text-xl">Register</h2>
      <p className="text-sm text-muted-foreground">
        Enter your information to create an account
      </p>
      <RegisterForm />
    </div>
  )
}

export default RegisterPage
