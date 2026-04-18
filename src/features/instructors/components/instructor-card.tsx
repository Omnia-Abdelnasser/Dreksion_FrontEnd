import { Link } from "@tanstack/react-router";
import { Star, MapPin, Car, BadgeCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Instructor } from "@/shared/types";

/**
 * InstructorCard Component
 * Displays summary information for a single instructor.
 */
export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated">
      {/* Media Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={instructor.avatarUrl || "/placeholder-avatar.jpg"}
          alt={instructor.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {instructor.isVerified && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-medium text-white shadow-soft">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        )}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-soft" dir="ltr">
          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
          <span>{instructor.rating}</span>
          <span className="text-muted-foreground">({instructor.reviewsCount})</span>
        </span>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-3 p-5 text-right">
        <div>
          <h3 className="text-lg font-bold text-foreground">{instructor.name}</h3>
          <p className="mt-1 flex items-center justify-end gap-1 text-sm text-muted-foreground">
            {instructor.location || "Cairo"}
            <MapPin className="h-3.5 w-3.5" />
          </p>
        </div>

        {/* Badges/Tags */}
        <div className="flex flex-row-reverse flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-blue-600">
            <Car className="h-3 w-3" />
            {instructor.carType}
          </span>
          {instructor.experienceYears && (
            <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
              {instructor.experienceYears} Years Experience
            </span>
          )}
        </div>

        {/* Footer Section: Price & Action */}
        <div className="mt-auto flex flex-row-reverse items-end justify-between border-t border-border pt-3">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Price per hour</p>
            <p className="text-xl font-bold text-foreground">
              <span>{instructor.hourlyRate}</span>
              <span className="mr-1 text-sm font-medium text-muted-foreground">EGP</span>
            </p>
          </div>
          <Link to="/instructors/$id" params={{ id: instructor.id }}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View Profile</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}