"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  Building2,
  CreditCard,
  DollarSign,
  ShoppingCart,
  Globe,
  Wrench,
  TrendingUp,
  Package,
  Bell,
} from "lucide-react"
import Image from "next/image"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Staff",
    href: "/staff",
    icon: Users,
  },
  {
    name: "Payment Voucher",
    href: "/payment-voucher",
    icon: CreditCard,
  },
  {
    name: "Payroll",
    href: "/payroll",
    icon: DollarSign,
  },
  {
    name: "Memo",
    href: "/memo",
    icon: FileText,
  },
  {
    name: "Circulars",
    href: "/circulars",
    icon: FileText,
  },
  {
    name: "Maintenance",
    href: "/maintenance",
    icon: Wrench,
  },
  {
    name: "Logistics",
    href: "/logistics",
    icon: Globe,
  },
  {
    name: "Office Budget",
    href: "/office-budget",
    icon: DollarSign,
  },
  {
    name: "Stocks and Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    name: "Capacity Building",
    href: "/capacity-building",
    icon: TrendingUp,
  },
  {
    name: "Procurements",
    href: "/procurements",
    icon: ShoppingCart,
  },
]

export default function SidebarSlot() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="UiUxOtor Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <div>
              <div className="text-lg font-bold text-blue-600">UiUxOtor</div>
              <div className="text-xs text-gray-700">ERP System</div>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isItemActive = isActive(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isItemActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
