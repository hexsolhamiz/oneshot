"use client";

import { useParams } from "next/navigation";
import { PlayerProfile } from "@/components/admin/players/player-profile";
import { useGetPlayerByIdQuery } from "@/store/slices/admin-slice";
import React from "react";
import { PlayerProfileSkeleton } from "@/components/skeleton/player-skeleton";
import { formatDistanceToNow } from "date-fns";

const Page = () => {
  const { id } = useParams() as { id: string };
  const { data, isLoading, error } = useGetPlayerByIdQuery(id);

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-primary">Player Profile</h1>

        {isLoading && <PlayerProfileSkeleton />}

        {data && (
          <PlayerProfile
            firstName={data.firstName}
            lastName={data.lastName}
            imageUrl={data.imageUrl}
            age={data.age}
            dob={new Date(data.dateOfBirth).toLocaleDateString()}
            joined={formatDistanceToNow(new Date(data?.createdAt || ""), { addSuffix: true })}
            city={data.city === "South_London" ? "South London" : data.city === "North_London" ? "North London" : data.city}
            nationality={data.nationality}
            position={data.position}
          />
        )}

        {error && (
          <div className="text-red-500">Error loading player data</div>
        )}
      </div>
    </main>
  );
};

export default Page;
