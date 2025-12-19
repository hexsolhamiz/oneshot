import Image from "next/image";
import { Globe, MapPin } from "lucide-react";

interface PlayerProfileProps {
  firstName: string;
  lastName: string;
  imageUrl: string;
  age: number;
  city: string;
  nationality: string;
  dob: string;
  joined: string;
  position: string;
}

export function PlayerProfile({
  firstName,
  lastName,
  imageUrl,
  age,
  city,
  nationality,
  position,
  dob,
  joined,

}: PlayerProfileProps) {
  return (
    <div className="w-full max-w-6xl bg-card rounded-2xl overflow-hidden shadow-lg">
      {/* Header with position badge */}
      <div className="relative h-64 md:h-80 flex bg-gradient-to-b from-accent/20 to-transparent">
        {/* Player Image */}
        <div className="relative w-full lg:w-[30%] h-full flex lg:flex-row flex-col items-center justify-center">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={`${firstName} ${lastName}`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="lg:w-[70%] p-6 md:p-8">
          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
            {firstName}{" "}
            <span className="font-light opacity-80">{lastName}</span>
          </h1>

          {/* Main Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Age
              </p>
              <p className="text-2xl font-bold text-foreground">{age}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                <MapPin size={16} />
                City
              </p>
              <p className="text-lg font-semibold text-foreground">{city}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                <Globe size={16} />
                Nationality
              </p>
              <p className="text-lg font-semibold text-foreground">
                {nationality}
              </p>
            </div>


            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                <Globe size={16} />
                Position
              </p>
              <p className="text-lg font-semibold text-foreground">
                {position}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                <Globe size={16} />
                Joined
              </p>
              <p className="text-sm text-foreground">
                {joined}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1">
                <Globe size={16} />
                Date of Birth
              </p>
              <p className="text-sm font-semibold text-foreground">
                {dob}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
