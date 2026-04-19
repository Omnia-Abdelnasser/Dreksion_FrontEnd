import { BadgeCheck, Car, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { Instructor } from '@/shared/types'; 

const carTypeLabel = (type: string) => (type === 'automatic' ? 'أوتوماتيك' : 'مانيوال (عادي)');

export default function InstructorCard({
  instructor,
}: {
  instructor: Instructor;
}) {
  if (!instructor) return null;

  return (
    <article className='shadow-soft group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1' dir="rtl">
      {/* Image Section */}
      <div className='relative aspect-[4/3] overflow-hidden bg-muted'>
        <img
          src={instructor.avatarUrl || '/placeholder.jpg'}
          alt={instructor.name}
          className='h-full w-full object-cover transition-transform group-hover:scale-105'
        />
        
        {/* Verified Badge */}
        {instructor.isVerified && (
          <span className='absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg'>
            <BadgeCheck className='h-3 w-3' /> موثق
          </span>
        )}

        {/* Rating Floating Badge - Matches the Rating Filter */}
        <div className='absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-xl bg-background/90 backdrop-blur-sm px-2 py-1 text-xs font-bold shadow-sm'>
          <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
          <span>{instructor.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className='flex flex-1 flex-col gap-4 p-5'>
        {/* Name and Car Info */}
        <div className="space-y-1">
          <h3 className='text-lg font-bold tracking-tight text-foreground'>{instructor.name}</h3>
          <p className='text-sm text-muted-foreground flex items-center gap-1'>
            <Car className="h-3.5 w-3.5" />
            {instructor.carType.includes('(') ? instructor.carType : carTypeLabel(instructor.carType)}
          </p>
        </div>

        {/* Tags Row - Matches Location & Distance */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg bg-secondary/50 px-2.5 py-1 text-[11px] font-medium">
            <MapPin className="h-3 w-3 text-primary" />
            {instructor.location || 'القاهرة'}
          </span>
          {instructor.distanceKm && (
             <span className="inline-flex items-center gap-1 rounded-lg bg-primary/10 text-primary px-2.5 py-1 text-[11px] font-bold">
               {instructor.distanceKm} كم
             </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-[11px]">
            {instructor.reviewsCount} تقييم
          </span>
        </div>

        {/* Price Section - Matches the Price Slider */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">سعر الساعة</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-primary">{instructor.hourlyRate}</span>
              <span className="text-xs font-bold text-muted-foreground">ج.م</span>
            </div>
          </div>
          
          <Button asChild size="sm" className="rounded-xl font-bold px-5">
            <Link to={`/instructor/${instructor.id}`}>
              عرض الملف
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}