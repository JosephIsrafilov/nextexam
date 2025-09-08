"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, Plus, Edit, Trash2, X, ChevronDown } from "lucide-react"
import { useStaff } from "@/contexts/StaffContext"


export default function StaffPage() {
  const { staff } = useStaff()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All Statuses")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(13)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterStatus, itemsPerPage])

  const filteredStaff = staff.filter((staffMember) => {
    const matchesSearch = staffMember.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staffMember.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staffMember.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staffMember.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staffMember.designation.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesSearch
  })

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentStaff = filteredStaff.slice(startIndex, endIndex)

  const getStatusBadge = (status: string) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between gap-6">
          {/* Quick Search */}
          <div className="flex-1 max-w-sm">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Quick search a staff
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter search word"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
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

          {/* Total Staff Count */}
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{staff.length}</div>
            <div className="text-sm text-gray-600">Total number of staff</div>
          </div>

          {/* Filter Staff */}
          <div className="min-w-[180px]">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Filter staff
            </label>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none bg-white text-gray-900"
              >
                <option value="All Statuses">All staff</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Add New Staff Button */}
          <Link
            href="/staff/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Staff
          </Link>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Staff</h2>
        </div>
        
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
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S/N
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FIRST NAME
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LAST NAME
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GENDER
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STAFF ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PHONE NUMBER
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ROLE
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DESIGNATION
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentStaff.map((staff, index) => (
                <tr key={staff.staffId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {String(staff.sn).padStart(2, '0')}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {staff.firstName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {staff.lastName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {staff.gender}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {staff.staffId}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {staff.phoneNumber}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {staff.role}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {staff.designation}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/staff/${staff.staffId}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View more
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
            >
              &lt;&lt;
            </button>
            
            {Array.from({ length: 5 }, (_, i) => {
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
            
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-sm text-gray-500">Copyright &copy; 2025 Relia Energy. All Rights Reserved</p>
      </div>
    </div>
  )
}
