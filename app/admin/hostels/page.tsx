"use client";
import { useEffect, useState } from "react";
import { fetchHostels, createHostel } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ManageHostels() {
  const [hostels, setHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    gender: "mixed" as "male" | "female" | "mixed",
    number_of_rooms: 0
  });

  async function loadHostels() {
    try {
      const data = await fetchHostels();
      setHostels(data || []);
    } catch (e: any) {
      toast.error("Failed to load hostels");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHostels();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setSubmitting(true);
    try {
      await createHostel({
        ...formData,
        number_of_rooms: Number(formData.number_of_rooms)
      });
      toast.success("Hostel created successfully");
      setDialogOpen(false);
      setFormData({ name: "", location: "", gender: "mixed", number_of_rooms: 0 });
      loadHostels();
    } catch (e: any) {
      console.error(e);
      toast.error(`Failed to create hostel: ${e.message || "Unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Hostels</h1>
          <p className="text-muted-foreground mt-1">View and configure campus accommodation buildings.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="h-4 w-4 mr-2" /> Add New Hostel
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Hostel</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Hostel Name</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Block A"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. North Campus"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Allowed Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => {
                    if (value) {
                      setFormData({...formData, gender: value as "male" | "female" | "mixed"})
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rooms">Number of Rooms</Label>
                <Input 
                  id="rooms" 
                  type="number"
                  min="0"
                  value={formData.number_of_rooms || ""}
                  onChange={(e) => setFormData({...formData, number_of_rooms: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                  </>
                ) : (
                  "Add Hostel"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-card rounded-xl border shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading hostels...</div>
        ) : hostels.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No hostels found.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hostel Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead className="text-right">Total Rooms</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hostels.map((hostel) => (
                <TableRow key={hostel.id}>
                  <TableCell className="font-medium">{hostel.name}</TableCell>
                  <TableCell>{hostel.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{hostel.gender}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{hostel.number_of_rooms || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
