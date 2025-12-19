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
import { Search, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

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


interface TrialPlayer {
  firstName: string;
  lastName: string;
  age: number;
  position: string;

}
interface TrialsTableProps {
  bookings: {
    session: string;
    player: TrialPlayer
  }[]
}
export default function TrialsTable({ bookings }: TrialsTableProps) {


  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("ALL");


  const filteredPlayers = useMemo(() => {
    if (!bookings) return [];

    return bookings.filter((player) => {
      const matchesSearch =
        searchQuery === "" ||
        player.player.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.player.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${player.player.firstName} ${player.player.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesPosition =
        selectedPosition === "ALL" || player.player.position === selectedPosition;

      return matchesSearch && matchesPosition;
    });
  }, [bookings, searchQuery, selectedPosition]);




  const exportToCSV = () => {
    if (!filteredPlayers.length) return;

    const headers = ["First Name", "Last Name", "Age", "Position"];

    const rows = filteredPlayers.map(player => [
      player.player.firstName,
      player.player.lastName,
      player.player.age.toString(),
      player.player.position,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "players.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-6 p-6 w-full max-w-7xl ">


      <Card className="border-primary border-2 rounded-4xl">
        <CardHeader>
          <CardTitle>All Players</CardTitle>
          <CardDescription>
            {filteredPlayers.length} player{filteredPlayers.length !== 1 ? "s" : ""} found
          </CardDescription>
          <Button
            onClick={exportToCSV}
            disabled={!filteredPlayers.length}
            className="px-4 hover:cursor-pointer py-2 text-sm rounded-md bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Export CSV
          </Button>
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
                  className={`cursor-pointer transition-all ${selectedPosition === position
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
                  <TableHead>Session</TableHead>
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
                          {user.player.firstName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {user.player.lastName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.player.age}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getPositionColor(user.player.position)}
                        >
                          <Trophy className="h-3 w-3 mr-1" />
                          {user.player.position}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.session}</TableCell>
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




