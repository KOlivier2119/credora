import { Search, Bell, Moon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AdminHeaderProps {
  title: string
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-center p-6 border-b bg-white">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">3</Badge>
        </div>        
        <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white">
          <User className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

