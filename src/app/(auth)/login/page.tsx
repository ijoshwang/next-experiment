// import { Icons } from "@/components/Icons"
// import { Button } from "@/components/ui/button"
// import { handleGithubLogin, handleGoogleLogin } from "@/lib/auth.action"

import LoginForm from './LoginForm'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
}

const LoginPage = async ({ searchParams }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-full p-6 sm:max-w-md justify-center mx-auto rounded-lg border shadow-sm">
      <h2 className="font-semibold tracking-tight text-xl">Login</h2>

      {/* <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
        <form action={handleGithubLogin}>
          <Button variant="secondary" className="w-full">
            <Icons.gitHub className="h-4 w-4" />
            <span className="ml-2">Login with GitHub</span>
          </Button>
        </form>
        <form action={handleGoogleLogin}>
          <Button variant="secondary" className="w-full">
            <Icons.google className="h-4 w-4" />
            <span className="ml-2">Login with Google</span>
          </Button>
        </form> 
      </div>
      <Separator className="my-4" /> */}
      <LoginForm callbackUrl={searchParams.callbackUrl} />

      <div className="flex flex-col gap-4 mt-4">
        <h5>You can use below info to login:</h5>
        <p>Email: Abc1@aout.com</p>
        <p>Password: Abc1@aout.com</p>
      </div>
    </div>
  )
}

export default LoginPage
