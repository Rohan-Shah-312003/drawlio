import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-blue-600">Drawlio</h1>
          <p className="mt-2 text-lg text-gray-600">Draw, guess, and have fun!</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Play Now</CardTitle>
            <CardDescription className="text-center">Create a room or join an existing one</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/create" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Create Room</Button>
            </Link>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            <Link href="/join" className="w-full">
              <Button variant="outline" className="w-full">
                Join Room
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">No account needed to play!</p>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>Draw and guess with friends. Take turns drawing while others try to guess what you're drawing!</p>
        </div>
      </div>
    </div>
  )
}

