import { Users as UsersIcon, Search, MoreVertical } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { AdminUser } from "../types/admin.types";
import { getAllUsers } from "../services/admin.services";

/**
 * AdminUsers Management Component
 * Interface for admins to monitor and manage platform users.
 */
export function AdminUsers() {
  // 1. Fetching real users data from Node.js
  // Fixed: Using arrow function to resolve TypeScript overload error
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => getAllUsers(), 
  });

  return (
    <div className="space-y-8 p-1" dir="rtl">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-3 italic">
            <UsersIcon className="h-8 w-8 text-primary" />
            إدارة المستخدمين
          </h1>
          <p className="text-sm font-bold text-muted-foreground mt-1">
            متابعة حسابات الطلاب والمدربين والتحكم في صلاحيات الوصول
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="بحث بالاسم أو البريد..." 
            className="rounded-xl pr-10 border-border bg-muted/20 focus:bg-card font-bold"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr className="text-xs font-black text-muted-foreground uppercase tracking-wider">
                <th className="p-5">المستخدم</th>
                <th className="p-5">الدور</th>
                <th className="p-5">تاريخ الانضمام</th>
                <th className="p-5">الحالة</th>
                <th className="p-5">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center font-bold text-muted-foreground animate-pulse">
                    جاري تحميل المستخدمين...
                  </td>
                </tr>
              ) : (
                users?.map((user: AdminUser) => (
                  <tr key={user.id || user.email} className="transition-colors hover:bg-muted/20">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-11 w-11 border border-border shadow-sm">
                          <AvatarFallback className="font-black bg-primary/10 text-primary uppercase">
                            {user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-black text-foreground text-base">{user.name}</div>
                          <div className="text-xs font-bold text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-5">
                      <Badge variant="outline" className={`rounded-lg px-3 py-1 font-black transition-all ${
                        user.role === "instructor" 
                        ? "border-primary/30 text-primary bg-primary/5" 
                        : "border-border text-muted-foreground bg-muted/30"
                      }`}>
                        {user.role === "instructor" ? "مدرب" : "طالب"}
                      </Badge>
                    </td>

                    <td className="p-5 font-bold text-muted-foreground">{user.joinedDate}</td>
                    
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full transition-all ${
                          user.isActive 
                          ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" 
                          : "bg-red-500"
                        }`} />
                        <span className={`font-black ${user.isActive ? "text-green-700" : "text-red-700"}`}>
                          {user.isActive ? "نشط" : "موقوف"}
                        </span>
                      </div>
                    </td>

                    <td className="p-5">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="rounded-xl font-bold px-4 hover:bg-primary/10 hover:text-primary border-primary/20 transition-all active:scale-95">
                          تفاصيل
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-xl text-muted-foreground hover:bg-muted transition-colors">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Legend */}
      <div className="flex justify-center md:justify-start gap-6 px-2">
         <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <span className="h-3 w-3 rounded-full bg-green-500" /> حساب نشط
         </div>
         <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <span className="h-3 w-3 rounded-full bg-red-500" /> حساب موقوف
         </div>
      </div>
    </div>
  );
}