import Header from "./Header";
import { Outlet } from 'react-router-dom';



export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      
    </div>
  )
}
