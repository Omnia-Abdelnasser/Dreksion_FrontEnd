// src/app/routes/dashboard.tsx
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Award, TrendingUp, Clock, CheckCircle2, UserCircle } from "lucide-react";
// Header and Footer skipped for now
import { InstructorCard } from "@/features/instructors/components/instructor-card";
import { Instructor } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { cn } from "@/shared/lib/utils";

// Mock data for levels - replace with API later
const studentLevels = [
  { id: 1, title: "Level 1: Basics", progress: 100, skills: [{ name: "Starting Engine", done: true }, { name: "Moving Forward", done: true }] },
  { id: 2, title: "Level 2: City Driving", progress: 45, skills: [{ name: "Traffic Lights", done: true }, { name: "Parking", done: false }] }
];



function Dashboard() {
  const overallProgress = 65; // Example progress

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white font-cairo" dir="rtl">
      {/* Temporary Header Placeholder */}
      <div className="h-16 border-b border-white/5 bg-[#0F0F0F] flex items-center px-8 justify-between">
         <div className="text-xl font-bold text-blue-500">Dreksion</div>
         <UserCircle className="w-8 h-8 text-gray-400" />
      </div>

      <main className="flex-1 container mx-auto px-6 py-10 overflow-y-auto">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">Welcome Back, Taha 👋</h1>
            <p className="text-gray-500">You're doing great! Keep it up.</p>
          </div>
          <Link to="/explore">
            <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-2xl shadow-lg shadow-blue-500/20">
              Book New Lesson
            </Button>
          </Link>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          
          {/* Main Progress Area */}
          <section className="space-y-6">
             <div className="bg-[#0F0F0F] border border-white/5 rounded-[2rem] p-8">
                <div className="flex items-center justify-between mb-8 flex-row-reverse">
                   <h2 className="text-2xl font-bold">Your Progress</h2>
                   <div className="text-blue-500 font-black text-xl">{overallProgress}%</div>
                </div>
                
                <div className="space-y-8">
                   {studentLevels.map(level => (
                     <div key={level.id} className="bg-[#1A1A1A] p-6 rounded-3xl border border-white/5">
                        <div className="flex items-center justify-between mb-4 flex-row-reverse">
                           <h3 className="font-bold text-lg">{level.title}</h3>
                           <span className="text-sm text-gray-500 font-medium">Level {level.id}</span>
                        </div>
                        <Progress value={level.progress} className="h-2 bg-black/40" />
                        <div className="mt-6 grid grid-cols-2 gap-4">
                           {level.skills.map(skill => (
                             <div key={skill.name} className="flex items-center justify-end gap-2">
                                <span className={cn("text-sm", skill.done ? "text-gray-300" : "text-gray-600")}>{skill.name}</span>
                                <CheckCircle2 className={cn("w-4 h-4", skill.done ? "text-blue-500" : "text-gray-800")} />
                             </div>
                           ))}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Sidebar Area */}
          <aside className="space-y-6">
             <div className="bg-[#0F0F0F] border border-white/5 rounded-[2rem] p-8 text-right">
                <h2 className="text-xl font-bold mb-6">Upcoming Session</h2>
                <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl space-y-4">
                   <div className="flex items-center justify-end gap-3">
                      <div>
                        <p className="font-bold text-blue-400">Ahmed Mahmoud</p>
                        <p className="text-xs text-gray-500">Certified Instructor</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-blue-500" />
                      </div>
                   </div>
                   <div className="space-y-2 pt-2 border-t border-blue-500/10 text-sm text-gray-400">
                      <div className="flex items-center justify-end gap-2">Monday, 20 April <Calendar className="w-4 h-4" /></div>
                      <div className="flex items-center justify-end gap-2">04:00 PM <Clock className="w-4 h-4" /></div>
                   </div>
                </div>
             </div>

             <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-500/10">
                <Award className="w-12 h-12 mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2 italic">Pro Tip!</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                   Consistent practice is key. Try to book at least 2 sessions per week to finish your levels faster.
                </p>
             </div>
          </aside>
        </div>
      </main>
    </div>
  );
}