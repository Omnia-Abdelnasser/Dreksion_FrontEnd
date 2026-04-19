import { useEffect } from 'react';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import type { Instructor } from '@/shared/lib/mock-data';

const icon = L.divIcon({
   className: 'custom-marker',
   html: `<div style="background:#009499;width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="white" style="transform:rotate(45deg)"><path d="M19 17h2v2H3v-2h2V8a1 1 0 011-1h12a1 1 0 011 1v9zM7 9v8h10V9H7zm2 1h6v2H9v-2z"/></svg></div>`,
   iconSize: [32, 32],
   iconAnchor: [16, 32],
});

function FitBounds({ instructors }: { instructors: Instructor[] }) {
   const map = useMap();
   useEffect(() => {
      const validInstructors = instructors.filter((i) => i.lat && i.lng);
      if (validInstructors.length === 0) return;

      const bounds = L.latLngBounds(
         validInstructors.map((i) => [i.lat, i.lng])
      );
      map.fitBounds(bounds, { padding: [40, 40] });
   }, [instructors, map]);
   return null;
}

export function InstructorsMap({
   instructors,
   height = '400px',
}: {
   instructors: Instructor[];
   height?: string | number;
}) {
   return (
      <div
         style={{ height, width: '100%' }}
         className='overflow-hidden rounded-2xl border border-border'
      >
         <MapContainer
            center={[30.0444, 31.2357]}
            zoom={11}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
               url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <FitBounds instructors={instructors} />
            {instructors
               .filter((ins) => ins.lat && ins.lng)
               .map((ins) => (
                  <Marker
                     key={ins.id}
                     position={[ins.lat, ins.lng]}
                     icon={icon}
                  >
                     <Popup>
                        <div className='space-y-1 text-right' dir='rtl'>
                           <div className='font-bold text-primary'>
                              {ins.name}
                           </div>
                           <div className='text-xs text-muted-foreground'>
                              {ins.location}
                           </div>
                           <div className='text-sm font-semibold'>
                              {ins.hourlyRate} ج.م/ساعة
                           </div>
                        </div>
                     </Popup>
                  </Marker>
               ))}
         </MapContainer>
      </div>
   );
}
