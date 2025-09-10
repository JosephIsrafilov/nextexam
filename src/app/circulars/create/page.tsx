"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { FileText, Calendar, ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

const createCircularSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  sentFrom: z.string().min(1, "Sent from is required"),
  sentTo: z.string().min(1, "Sent to is required"),
  date: z.string().min(1, "Date is required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
})

type CreateCircularForm = z.infer<typeof createCircularSchema>

export default function CreateCircularPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateCircularForm>({
    resolver: zodResolver(createCircularSchema),
  })

  useEffect(() => {
    setValue("sentFrom", "Otor John")
    setValue("date", new Date().toLocaleDateString('en-GB'))
  }, [setValue])

  const onSubmit = async (data: CreateCircularForm) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log("Circular data:", data)
    setIsLoading(false)
    setShowSuccessModal(true)
  }

  const handleContinue = () => {
    setShowSuccessModal(false)
    router.push("/circulars")
  }

  if (showSuccessModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative">
          <img
            src="/modalsuccess.png"
            alt="Success Modal"
            className="max-w-sm w-full h-auto"
          />
          
          <button
            onClick={handleContinue}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-8 rounded-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <Link
        href="/circulars"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Create Circular</h1>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                Circular title
              </label>
              <input
                {...register("title")}
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                placeholder="Enter title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="sentFrom" className="block text-sm font-medium text-gray-900 mb-2">
                Sent from
              </label>
              <input
                {...register("sentFrom")}
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600 sm:text-sm"
                readOnly
              />
              {errors.sentFrom && (
                <p className="mt-1 text-sm text-red-600">{errors.sentFrom.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="sentTo" className="block text-sm font-medium text-gray-900 mb-2">
                Sent to
              </label>
              <select
                {...register("sentTo")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
              >
                <option value="">Select option</option>
                <option value="All Staff">All Staff</option>
                <option value="Management">Management</option>
                <option value="HR Department">HR Department</option>
                <option value="IT Department">IT Department</option>
                <option value="Finance Department">Finance Department</option>
                <option value="Operations Department">Operations Department</option>
                <option value="Marketing Department">Marketing Department</option>
              </select>
              {errors.sentTo && (
                <p className="mt-1 text-sm text-red-600">{errors.sentTo.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-900 mb-2">
                Date
              </label>
              <div className="relative">
                <input
                  {...register("date")}
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder={new Date().toLocaleDateString('en-GB')}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                Circular message
              </label>
              <textarea
                {...register("message")}
                rows={8}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                placeholder="Enter message..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-8 rounded-lg font-medium hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? "Sending..." : "Send Circular"}
            </button>
          </div>
        </div>
      </form>

      <div className="text-center py-6">
        <p className="text-sm text-gray-500">Copyright &copy; 2025 Relia Energy. All Rights Reserved</p>
      </div>
    </div>
  )
}
