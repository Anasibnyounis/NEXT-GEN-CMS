"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, FileText, ShoppingCart, MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"

interface DashboardStatsProps {
  websiteCount: number
}

export function DashboardStats({ websiteCount }: DashboardStatsProps) {
  const [stats, setStats] = useState({
    totalPages: 0,
    totalProducts: 0,
    totalForms: 0,
    totalSubmissions: 0,
  })

  useEffect(() => {
    // In a real app, this would be a server action
    // For now, we'll use mock data based on the website count
    setStats({
      totalPages: websiteCount * 4, // Assuming 4 pages per website on average
      totalProducts: websiteCount * 5, // Assuming 5 products per website on average
      totalForms: websiteCount * 2, // Assuming 2 forms per website on average
      totalSubmissions: websiteCount * 8, // Assuming 8 form submissions per website on average
    })
  }, [websiteCount])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{websiteCount}</div>
          <p className="text-xs text-muted-foreground">
            {websiteCount > 0 ? `${Math.round((websiteCount / 10) * 100)}% of your plan limit` : "No websites yet"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPages}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalPages > 0
              ? `Avg. ${(stats.totalPages / Math.max(1, websiteCount)).toFixed(1)} pages per site`
              : "No pages yet"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalProducts > 0
              ? `Avg. ${(stats.totalProducts / Math.max(1, websiteCount)).toFixed(1)} products per site`
              : "No products yet"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalSubmissions > 0 ? `Across ${stats.totalForms} forms` : "No form submissions yet"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
