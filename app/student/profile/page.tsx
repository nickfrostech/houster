"use client";
import { useAuth } from "@/lib/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { profile, user } = useAuth();
  
  if (!profile) return null;

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={profile.full_name} disabled />
            </div>
            <div className="space-y-2">
              <Label>Matriculation Number</Label>
              <Input defaultValue={profile.matric_number || ''} disabled />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={user?.email} disabled />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Input defaultValue={profile.gender || 'Not Set'} disabled className="capitalize" />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input defaultValue={profile.department || ''} placeholder="e.g. Computer Science" />
            </div>
            <div className="space-y-2">
              <Label>Level</Label>
              <Input defaultValue={profile.level_year || ''} placeholder="e.g. 400" type="number" />
            </div>
          </div>
          <Button className="mt-4">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
