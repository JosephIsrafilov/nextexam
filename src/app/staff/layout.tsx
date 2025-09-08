"use client"

import { useState, useEffect } from "react"
import { Bell, ChevronDown, User, Settings, LogOut, HelpCircle } from "lucide-react"
import Sidebar from "@/components/layout/Sidebar"

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-container')) {
        setShowProfileDropdown(false)
        setShowNotifications(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Top Header with User Profile (simplified) */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Page Title */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Staff</h1>
                <p className="text-gray-600">View, search for and add new staff</p>
              </div>
              
              {/* User Profile Section */}
              <div className="flex items-center">
                {/* Notifications */}
                <div className="relative dropdown-container">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-400 hover:text-gray-500 relative"
                  >
                    <Bell className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">New staff member added</p>
                              <p className="text-xs text-gray-500">2 minutes ago</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">Payroll processed successfully</p>
                              <p className="text-xs text-gray-500">1 hour ago</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2"></div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">System maintenance scheduled</p>
                              <p className="text-xs text-gray-500">3 hours ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile */}
                <div className="relative dropdown-container ml-4">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50"
                  >
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Otor John</p>
                      <p className="text-xs text-gray-500">HR Office</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>

                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">Otor John</p>
                          <p className="text-xs text-gray-500">HR Office</p>
                        </div>
                        <a
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <User className="h-4 w-4 mr-3" />
                          Profile
                        </a>
                        <a
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </a>
                        <a
                          href="/help"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <HelpCircle className="h-4 w-4 mr-3" />
                          Help
                        </a>
                        <div className="border-t border-gray-100">
                          <button
                            onClick={() => {
                              window.location.href = "/auth/login"
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
