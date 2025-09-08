"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ChevronDown, Plus, ArrowUpRight, Check, X } from "lucide-react"

// Generate recent dates for circulars
const generateRecentDates = () => {
  const dates = []
  for (let i = 0; i < 20; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toLocaleDateString('en-GB'))
  }
  return dates
}

const recentDates = generateRecentDates()

const circularsData = [
  {
    id: 1,
    title: "HR Circular for Operations Department Staff",
    sentFrom: "Admin, HR",
    sentTo: "Operations Staffs",
    date: recentDates[0],
    type: "Sent",
    typeIcon: ArrowUpRight,
  },
  {
    id: 2,
    title: "HR Circular for Operations Department Staff",
    sentFrom: "Admin, HR",
    sentTo: "Operations Staffs",
    date: recentDates[0],
    type: "Received",
    typeIcon: Check,
  },
  {
    id: 3,
    title: "Circular for Time Maintainance in the Office",
    sentFrom: "Management",
    sentTo: "All Staff",
    date: recentDates[0],
    type: "Received",
    typeIcon: Check,
  },
  {
    id: 4,
    title: "Management Circular for HR Staffs",
    sentFrom: "Management",
    sentTo: "HR Staffs",
    date: recentDates[1],
    type: "Sent",
    typeIcon: ArrowUpRight,
  },
  {
    id: 5,
    title: "IT Security Policy Update",
    sentFrom: "IT Department",
    sentTo: "All Staff",
    date: recentDates[2],
    type: "Received",
    typeIcon: Check,
  },
  {
    id: 6,
    title: "Monthly Team Meeting Schedule",
    sentFrom: "Admin, HR",
    sentTo: "Operations Staffs",
    date: recentDates[3],
    type: "Sent",
    typeIcon: ArrowUpRight,
  },
  {
    id: 7,
    title: "Office Holiday Schedule 2024",
    sentFrom: "Administration",
    sentTo: "All Staff",
    date: recentDates[4],
    type: "Received",
    typeIcon: Check,
  },
  {
    id: 8,
    title: "New Employee Onboarding Process",
    sentFrom: "Admin, HR",
    sentTo: "HR Staffs",
    date: recentDates[5],
    type: "Sent",
    typeIcon: ArrowUpRight,
  },
  {
    id: 9,
    title: "Quarterly Performance Review",
    sentFrom: "Management",
    sentTo: "All Staff",
    date: recentDates[6],
    type: "Received",
    typeIcon: Check,
  },
  {
    id: 10,
    title: "Training Program Announcement",
    sentFrom: "Admin, HR",
    sentTo: "Operations Staffs",
    date: recentDates[7],
    type: "Sent",
    typeIcon: ArrowUpRight,
  },
  {
    id: 11,
    title: "Budget Planning Meeting",
    sentFrom: "Finance",
    sentTo: "Management",
    date: recentDates[8],
    type: "Received",
    typeIcon: Check,
  },
  {
    id: 12,
    title: "System Maintenance Notice",
    sentFrom: "IT Department",
    sentTo: "All Staff",
    date: recentDates[9],
    type: "Sent",
    typeIcon: ArrowUpRight,
  },
  {
    id: 13,
    title: "Health and Safety Guidelines",
    sentFrom: "Admin, HR",
    sentTo: "All Staff",
    date: recentDates[10],
    type: "Received",
    typeIcon: Check,
  },
  {
    id: 14,
    title: "Project Deadline Extension",
    sentFrom: "Management",
    sentTo: "Operations Staffs",
    date: recentDates[11],
    type: "Sent",
    typeIcon: ArrowUpRight,
  },
  {
    id: 15,
    title: "Company Policy Updates",
    sentFrom: "Admin, HR",
    sentTo: "All Staff",
    date: recentDates[12],
    type: "Received",
    typeIcon: Check,
  },
  {
    id: 16,
    title: "Team Building Event",
    sentFrom: "Admin, HR",
    sentTo: "Operations Staffs",
    date: recentDates[13],
    type: "Sent",
    typeIcon: ArrowUpRight,
  },
  {
    id: 17,
    title: "Equipment Maintenance Schedule",
    sentFrom: "Operations",
    sentTo: "All Staff",
    date: recentDates[14],
    type: "Received",
    typeIcon: Check,
  },
  {
    id: 18,
    title: "New Software Training",
    sentFrom: "IT Department",
    sentTo: "All Staff",
    date: recentDates[15],
    type: "Sent",
    typeIcon: ArrowUpRight,
  },
  {
    id: 19,
    title: "Office Relocation Notice",
    sentFrom: "Administration",
    sentTo: "All Staff",
    date: recentDates[16],
    type: "Received",
    typeIcon: Check,
  },
  {
    id: 20,
    title: "Annual Performance Review",
    sentFrom: "Admin, HR",
    sentTo: "All Staff",
    date: recentDates[17],
    type: "Sent",
    typeIcon: ArrowUpRight,
  },
]

export default function CircularsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All memos")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(13)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterType, itemsPerPage])

  const filteredCirculars = circularsData.filter((circular) => {
    const matchesSearch = circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circular.sentFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         circular.sentTo.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterType === "All memos" || circular.type === filterType

    return matchesSearch && matchesFilter
  })

  const totalPages = Math.ceil(filteredCirculars.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCirculars = filteredCirculars.slice(startIndex, endIndex)

  const getTypeIcon = (type: string) => {
    return type === "Sent" ? ArrowUpRight : Check
  }

  const getTypeColor = (type: string) => {
    return type === "Sent" ? "text-blue-600" : "text-green-600"
  }

  return (
    <>
      {/* Dark Header Bar */}
      <div className="bg-gray-900 text-white px-6 py-4">
        <h1 className="text-2xl font-bold">Circulars</h1>
        <p className="text-gray-300">Search for and view all circulars.</p>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between gap-6">
          {/* Quick Search */}
          <div className="flex-1 max-w-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick search a circular
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter search word"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {searchTerm ? (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                ) : (
                  <Search className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Total Circulars */}
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{filteredCirculars.length}</div>
            <div className="text-sm text-gray-600">Total circulars</div>
          </div>

          {/* Filter Dropdown */}
          <div className="min-w-[180px]">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Filter circulars
            </label>
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none bg-white text-gray-900"
              >
                <option value="All memos">All memos</option>
                <option value="Sent">Sent</option>
                <option value="Received">Received</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Create Circular Button */}
          <div className="flex items-end">
            <Link
              href="/circulars/create"
              className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Circular
            </Link>
          </div>
        </div>
      </div>

      {/* All Circulars Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Items per page selector */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-end">
            <span className="text-sm text-gray-900">Showing</span>
            <div className="relative mx-2">
              <input
                type="number"
                value={itemsPerPage}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (value > 0 && value <= 1000) {
                    setItemsPerPage(value)
                  }
                }}
                className="block w-16 pl-2 pr-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-center"
                min="1"
                max="1000"
              />
            </div>
            <span className="text-sm text-gray-900">per page</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S/N</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CIRCULAR TITLE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SENT FROM</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SENT TO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CIRCULAR TYPE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCirculars.map((circular) => {
                const TypeIcon = getTypeIcon(circular.type)
                return (
                  <tr key={circular.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {circular.id.toString().padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {circular.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {circular.sentFrom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {circular.sentTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {circular.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <TypeIcon className={`h-4 w-4 mr-2 ${getTypeColor(circular.type)}`} />
                        <span className={`text-sm font-medium ${getTypeColor(circular.type)}`}>
                          {circular.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/circulars/${circular.id}`}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        View more
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-1">
            {totalPages > 0 && (
              <>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 text-sm border rounded ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50 text-gray-900'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="px-2 text-sm text-gray-500">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-900"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
                >
                  &gt;&gt;
                </button>
              </>
            )}
          </div>
        </div>
      </div>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-sm text-gray-500">Copyright © 2025 Relia Energy. All Rights Reserved</p>
        </div>
      </div>
    </>
  )
}
