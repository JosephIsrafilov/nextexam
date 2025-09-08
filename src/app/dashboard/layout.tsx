import Header from "@/components/layout/Header"

export default function DashboardLayout({
  children,
  sidebar,
  main,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  main: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {sidebar}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            {main}
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
