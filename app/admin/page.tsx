"use client";
import { useEffect, useState } from "react";
import { fetchAllApplications, fetchHostels } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, ClipboardCheck, ClipboardX, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalHostels: 0,
    totalApplications: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      if (!user) return;
      try {
        const apps = await fetchAllApplications();
        const hostels = await fetchHostels();
        
        setStats({
          totalHostels: hostels?.length || 0,
          totalApplications: apps?.length || 0,
          pending: apps?.filter((a: any) => a.status === 'pending').length || 0,
          approved: apps?.filter((a: any) => a.status === 'approved').length || 0,
          rejected: apps?.filter((a: any) => a.status === 'rejected').length || 0,
        });
      } catch (err) {
        console.error("Error loading stats", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [user]);

  if (loading) return <div className="p-8 text-muted-foreground">Loading statistics...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Hostels</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHostels}</div>
            <p className="text-xs text-muted-foreground mt-1">Managed across campus</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">Require admin review</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Allocated Bed Spaces</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.approved}</div>
            <p className="text-xs text-muted-foreground mt-1">Students assigned</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
