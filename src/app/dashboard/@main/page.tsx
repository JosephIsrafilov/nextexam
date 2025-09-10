"use client"

import { Users, FileText, Rocket, Building2, ArrowUp, ArrowDown } from "lucide-react"

const stats = [
  {
    name: "Total number of staff",
    value: "250",
    change: "12 more than last quarter",
    changeType: "positive",
    icon: Users,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    name: "Total application",
    value: "100",
    change: "0.2% lower than last quarter",
    changeType: "negative",
    icon: FileText,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    name: "Total projects",
    value: "10",
    change: "2% more than last quarter",
    changeType: "positive",
    icon: Rocket,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    name: "Total departments",
    value: "10",
    change: "",
    changeType: "neutral",
    icon: Building2,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
]

const memoData = [
  {
    id: 1,
    title: "Operations memo",
    sentFrom: "Otor John",
    sentTo: "Ibrahim Sadiq",
    status: "Pending",
    statusColor: "text-orange-500",
  },
  {
    id: 2,
    title: "Operations project memo",
    sentFrom: "Fatima Faruk",
    sentTo: "Shola Abiola",
    status: "Approved",
    statusColor: "text-green-500",
  },
  {
    id: 3,
    title: "Project onboard notice",
    sentFrom: "Otor John",
    sentTo: "James Emeka",
    status: "Approved",
    statusColor: "text-green-500",
  },
  {
    id: 4,
    title: "Operations memo",
    sentFrom: "Ibrahim Musa",
    sentTo: "Otor John",
    status: "Approved",
    statusColor: "text-green-500",
  },
]

const staffData = [
  {
    id: 1,
    name: "Abubakar Ismaila Goje",
    role: "Admin",
    designation: "Human Resource Dept.",
  },
  {
    id: 2,
    name: "Ifeanyi Obinna",
    role: "Admin",
    designation: "Management",
  },
  {
    id: 3,
    name: "Bankole Olanrewaju",
    role: "HOD I.T",
    designation: "Peoples and Operation",
  },
  {
    id: 4,
    name: "Chidinma Ebere",
    role: "HOD Account",
    designation: "Accounts",
  },
]

const paymentVouchers = [
  {
    id: 1,
    subject: "Request for FARS for October 2025",
    date: new Date().toLocaleDateString('en-GB'),
    status: "Pending",
    statusColor: "text-orange-500",
  },
  {
    id: 2,
    subject: "Request for project proposal fee",
    date: new Date(Date.now() - 86400000).toLocaleDateString('en-GB'),
    status: "Approved",
    statusColor: "text-green-500",
  },
  {
    id: 3,
    subject: "Request for FARS for October 2025",
    date: new Date(Date.now() - 172800000).toLocaleDateString('en-GB'),
    status: "Approved",
    statusColor: "text-green-500",
  },
  {
    id: 4,
    subject: "Request for project proposal fee",
    date: new Date(Date.now() - 259200000).toLocaleDateString('en-GB'),
    status: "Pending",
    statusColor: "text-orange-500",
  },
]

const applicationStats = {
  total: 500,
  pending: 80,
  approved: 370,
  rejected: 50,
}

export default function MainSlot() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 mb-2">{stat.name}</p>
              {stat.change && (
                <div className="flex items-center">
                  {stat.changeType === "positive" ? (
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : stat.changeType === "negative" ? (
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  ) : null}
                  <span className={`text-sm font-medium ${
                    stat.changeType === "positive" ? "text-green-600" : 
                    stat.changeType === "negative" ? "text-red-600" : "text-gray-600"
                  }`}>
                    {stat.change}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Memo</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S/N
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Memo Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sent From
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sent To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {memoData.map((memo) => (
                    <tr key={memo.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {String(memo.id).padStart(2, '0')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {memo.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {memo.sentFrom}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {memo.sentTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${memo.statusColor}`}>
                          {memo.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Payment Vouchers</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S/N
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentVouchers.map((voucher) => (
                    <tr key={voucher.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {String(voucher.id).padStart(2, '0')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {voucher.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {voucher.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${voucher.statusColor}`}>
                          {voucher.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Staff List</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      S/N
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Designation
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staffData.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {String(staff.id).padStart(2, '0')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {staff.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {staff.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {staff.designation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Staff Applications</h3>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-900">{applicationStats.total}</div>
                <div className="text-sm text-gray-500">Total applications</div>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray={`${(applicationStats.approved / applicationStats.total) * 251} 251`}
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="8"
                      strokeDasharray={`${(applicationStats.pending / applicationStats.total) * 251} 251`}
                      strokeDashoffset={`-${(applicationStats.approved / applicationStats.total) * 251}`}
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="8"
                      strokeDasharray={`${(applicationStats.rejected / applicationStats.total) * 251} 251`}
                      strokeDashoffset={`-${((applicationStats.approved + applicationStats.pending) / applicationStats.total) * 251}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{applicationStats.total}</div>
                      <div className="text-sm text-gray-500">Total</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Approved</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{applicationStats.approved}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{applicationStats.pending}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-600">Rejected</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{applicationStats.rejected}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-6">
        <p className="text-sm text-gray-500">Copyright &copy; 2025 Relia Energy. All Rights Reserved</p>
      </div>
    </div>
  )
}
