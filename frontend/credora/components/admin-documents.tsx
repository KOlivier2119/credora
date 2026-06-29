"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, FileText, Eye } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import { api, getErrorMessage } from "@/lib/api"

interface AdminDocument {
  id: number
  documentType: string
  fileName: string
  status: string
  uploadedAt: string
  customerName?: string
  customerEmail?: string
  applicationRef?: string
  loanType?: string
}

export default function AdminDocuments() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [documents, setDocuments] = useState<AdminDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const load = () => {
    setLoading(true)
    api.get<AdminDocument[]>(`/admin/documents?status=${statusFilter}`)
      .then((r) => setDocuments(r.data))
      .catch((e) => setError(getErrorMessage(e)))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [statusFilter])

  const updateStatus = async (id: number, status: string) => {
    try {
      await api.patch(`/admin/documents/${id}/status`, { status })
      load()
    } catch (e) {
      setError(getErrorMessage(e))
    }
  }

  const statusColor = (s: string) => {
    switch (s?.toUpperCase()) {
      case "APPROVED":
      case "VERIFIED": return "bg-green-100 text-green-800"
      case "REJECTED": return "bg-red-100 text-red-800"
      default: return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <AdminLayout title="KYC Document Review">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Document Review</h1>
            <p className="text-gray-500">Review and approve uploaded KYC documents</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending_review">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {loading && <p className="text-gray-500">Loading documents...</p>}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Uploaded Documents ({documents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Application</TableHead>
                  <TableHead>Loan Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                      No documents uploaded yet
                    </TableCell>
                  </TableRow>
                )}
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="font-medium">{doc.fileName}</div>
                      <div className="text-xs text-gray-500">{doc.documentType}</div>
                    </TableCell>
                    <TableCell>
                      <div>{doc.customerName || "—"}</div>
                      <div className="text-xs text-gray-500">{doc.customerEmail}</div>
                    </TableCell>
                    <TableCell>{doc.applicationRef || "—"}</TableCell>
                    <TableCell className="capitalize">{doc.loanType || "—"}</TableCell>
                    <TableCell>
                      <Badge className={statusColor(doc.status)}>{doc.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{doc.uploadedAt?.slice(0, 10)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => updateStatus(doc.id, "APPROVED")}>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => updateStatus(doc.id, "REJECTED")}>
                          <XCircle className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
