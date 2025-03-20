import { Search, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="flex justify-between items-center p-6 border-b">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for something"
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">3</Badge>
      </div>
    </div>
  )
}

