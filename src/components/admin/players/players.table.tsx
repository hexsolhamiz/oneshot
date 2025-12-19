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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Search, Trophy } from "lucide-react";
import { useGetAllPlayersQuery } from "@/store/slices/admin-slice";
import UsersSkeleton from "@/components/skeleton/users-skeleton";
import { DropdownMenu,DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const POSITIONS = ["ALL", "GK", "DEF", "MID", "WING", "STR"];

const getPositionColor = (position: string) => {
  const colors: Record<string, string> = {
    GK: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    DEF: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    MID: "bg-green-500/10 text-green-500 border-green-500/20",
    WING: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    STR: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return colors[position] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
};

 export default function PlayersTable() {
  const router = useRouter();
  const handleViewProfile = (playerId: string) => {
    router.push(`/admin/players/${playerId}`);
  }
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("ALL");

  const { data, isLoading, error } = useGetAllPlayersQuery(null);

  const filteredPlayers = useMemo(() => {
    if (!data) return [];

    return data.filter((player) => {
      const matchesSearch =
        searchQuery === "" ||
        player.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${player.firstName} ${player.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesPosition =
        selectedPosition === "ALL" || player.position === selectedPosition;

      return matchesSearch && matchesPosition;
    });
  }, [data, searchQuery, selectedPosition]);

  if (isLoading) return <UsersSkeleton />;
  if (error) return <div>Error loading players</div>;

  return (
    <div className="space-y-6 p-6 w-full max-w-[1300px]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-purple-400">
          Players
        </h1>
        <p className="text-yellow-400">Manage all players</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Players</CardTitle>
          <CardDescription>
            {filteredPlayers.length} player{filteredPlayers.length !== 1 ? "s" : ""} found
          </CardDescription>
          
          {/* Search Bar */}
          <div className="flex flex-col gap-4 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by player name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Position Filters */}
            <div className="flex flex-wrap gap-2">
              {POSITIONS.map((position) => (
                <Badge
                  key={position}
                  variant={selectedPosition === position ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedPosition === position
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedPosition(position)}
                >
                  {position}
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
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Nationality</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No players found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPlayers.map((user, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center font-medium">
                          {user.firstName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {user.lastName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.age}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getPositionColor(user.position)}
                        >
                          <Trophy className="h-3 w-3 mr-1" />
                          {user.position}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.nationality}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.city === "South_London" ? "South London" : user.city === "North_London" ? "North London" : user.city}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.phoneNumber}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {new Date(user.dateOfBirth).toLocaleDateString()}
                        </Badge>
                      </TableCell>
                   
                     <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                          onClick={() => handleViewProfile(user.id)}
                          >
                            View Profile
                          </DropdownMenuItem>                        
                        </DropdownMenuContent>
                      </DropdownMenu>
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




