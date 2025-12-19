"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Calendar, MapPin, DollarSign, TrafficCone,Loader2 } from "lucide-react";
import { useGetAllEventsQuery } from "@/store/slices/admin-slice";
import UsersSkeleton from "@/components/skeleton/users-skeleton";
import axiosInstance from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CITIES = [
  "ALL",
  "North_London",
  "South_London",
  "Manchester",
  "Liverpool",
  "Birmingham",
  "Nottingham",
  "Bristol",
  "Leeds",
  "Newcastle",
];

const getCityDisplayName = (city:string) => {
  return city.replace(/_/g, " ");
};

const getCityColor = (city: string) => {
  const colors: Record<string, string> = {
    North_London: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    South_London: "bg-green-500/10 text-green-500 border-green-500/20",
    East_London: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    West_London: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    Central_London: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return colors[city] ?? "bg-gray-500/10 text-gray-500 border-gray-500/20";
};

export default function TrialsContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("ALL");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  // Form state for creating new trial
  const [newTrialDate, setNewTrialDate] = useState("");
  const [newTrialCity, setNewTrialCity] = useState("");
  const [newTrialPrice, setNewTrialPrice] = useState("");
  const [venue, setVenue] = useState("")
  const { data, isLoading, error } = useGetAllEventsQuery(null);

  const filteredTrials = useMemo(() => {
    if (!data) return [];

    return data.filter((trial) => {
      const matchesSearch =
        searchQuery === "" ||
        trial.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trial.city?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity =
        selectedCity === "ALL" || trial.city === selectedCity;

      return matchesSearch && matchesCity;
    });
  }, [data, searchQuery, selectedCity]);

  const handleCreateTrial = async () => {
    setLoading(true);
    const trialData = {
      eventDate: new Date(newTrialDate).toISOString(),
      city: newTrialCity,
      standardPrice: parseFloat(newTrialPrice),
      venue: venue,
    };

    try {
      // Replace with your actual API endpoint
      const response = await axiosInstance.post("/events", trialData);

      if (response.status === 201) {
        toast.success("Trial created successfully");
        setLoading(false)
        setIsDialogOpen(false);
        setNewTrialDate("");
        setNewTrialCity("");
        setNewTrialPrice("");
        setVenue("");
        setLoading(false);
        // Optionally refetch or update the data
        window.location.reload();
      } else {
        console.error("Failed to create trial");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating trial:", error);
      setLoading(false);
    }
  };


  const handleViewDetails = (trialId: string) => {
    router.push(`/admin/events/${trialId}`);
  }
  if (isLoading) return <UsersSkeleton />;
  if (error) return <div>Error loading trials</div>;

  return (
    <div className="space-y-6 p-6 w-full max-w-[1300px]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-purple-400">
            Trials
          </h1>
          <p className="text-yellow-400">Manage all trial events</p>
        </div>
        
        {/* Create New Trial Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Trial
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Trial Event</DialogTitle>
              <DialogDescription>
                Add a new trial event. Fill in all the required details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="date">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newTrialDate}
                  onChange={(e) => setNewTrialDate(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  City
                </Label>
                <Select value={newTrialCity} onValueChange={setNewTrialCity} required>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.filter(city => city !== "ALL").map((city) => (
                      <SelectItem key={city} value={city}>
                        {getCityDisplayName(city)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="venue">
                  <TrafficCone className="h-4 w-4 inline mr-2" />
                  Venue
                </Label>
                <Input
                  id="venue"
                  type="text"
                  step="0.01"
                  placeholder="e.g., Community Center Hall"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">
                  <DollarSign className="h-4 w-4 inline mr-2" />
                  Standard Price (£)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="25.00"
                  value={newTrialPrice}
                  onChange={(e) => setNewTrialPrice(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
              
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                className="bg-purple-600 hover:bg-purple-700"
                disabled={loading}
                onClick={handleCreateTrial}
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Create Trial"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Trials</CardTitle>
          <CardDescription>
            {filteredTrials.length} trial{filteredTrials.length !== 1 ? "s" : ""} found
          </CardDescription>
          
          {/* Search and Filter Section */}
          <div className="flex flex-col gap-4 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search trials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* City Filters */}
            <div className="flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <Badge
                  key={city}
                  variant={selectedCity === city ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedCity === city
                      ? "bg-purple-600 hover:bg-purple-700"
                      : city !== "ALL" 
                      ? getCityColor(city) + " hover:bg-accent"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedCity(city)}
                >
                  {getCityDisplayName(city)}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Standard Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead >Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No trials found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTrials.map((trial, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-2 font-medium">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {trial.eventDate ? new Date(trial.eventDate).toLocaleDateString() : "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getCityColor(trial.city)}
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          {getCityDisplayName(trial.city)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {trial.venue || "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          £{trial.standardPrice || "0.00"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={trial.status === "ACTIVE" ? "default" : "outline"}>
                          {trial.status || "PENDING"}
                        </Badge>
                      </TableCell>
                      <TableCell >
                        <Button className="hover:cursor-pointer" onClick={()=> {handleViewDetails(trial.id)}} size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}