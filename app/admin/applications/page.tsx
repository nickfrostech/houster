"use client";
import { useEffect, useState } from "react";
import { fetchAllApplications } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

export default function ManageApplications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadApps() {
    try {
      const data = await fetchAllApplications();
      setApplications(data || []);
    } catch (e: any) {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApps();
  }, []);

  const handleUpdateStatus = async (appId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', appId);
      if (error) throw error;
      toast.success(`Application updated to ${status}`);
      loadApps();
    } catch (e: any) {
      toast.error(e.message || "Failed to update application status");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Manage Applications</h1>
      <p className="text-muted-foreground">Review and allocate bed spaces based on applications.</p>
      
      <div className="bg-card rounded-xl border shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No applications found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Matric No.</TableHead>
                <TableHead>Hostel</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">
                    {app.profiles?.full_name || 'Demo Student'}
                  </TableCell>
                  <TableCell>{app.profiles?.matric_number || 'N/A'}</TableCell>
                  <TableCell>{app.hostels?.name || 'Main Hall'}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(app.created_at || new Date().toISOString()).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={app.status === 'approved' ? 'success' : app.status === 'rejected' ? 'destructive' : 'warning'}
                      className="capitalize"
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {app.status === 'pending' && (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleUpdateStatus(app.id, 'approved')}>
                          <Check className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleUpdateStatus(app.id, 'rejected')}>
                          <X className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
