import { CheckCircle2, X, FileText, Eye, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { AdminInstructorView, InstructorStatus } from "../types/admin.types";
import { getPendingInstructors, updateInstructorStatus } from "../services/admin.services";

const getStatusDetails = (status: InstructorStatus) => {
  const map: Record<InstructorStatus, { label: string; cls: string }> = {
    pending: { label: "قيد المراجعة", cls: "bg-orange-100 text-orange-700 border-orange-200" },
    approved: { label: "معتمد", cls: "bg-green-100 text-green-700 border-green-200" },
    rejected: { label: "مرفوض", cls: "bg-red-100 text-red-700 border-red-200" },
  };
  return map[status] || { label: status, cls: "bg-gray-100 text-gray-700" };
};

export function InstructorsReview() {
  const queryClient = useQueryClient();

  // 1. Fetch instructors from Node.js
  const { data: instructors, isLoading } = useQuery({
    queryKey: ['pending-instructors'],
    queryFn: getPendingInstructors,
  });

  // 2. Mutation for Approve/Reject action
  const { mutate: handleVerify, isPending: isVerifying } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'approved' | 'rejected' }) => 
      updateInstructorStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-instructors'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] }); // Update dashboard numbers
      toast.success("تم تحديث حالة المدرب بنجاح");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء التحديث");
    }
  });

  return (
    <div className="space-y-8 p-1" dir="rtl">
      <div>
        <h1 className="text-3xl font-black text-foreground tracking-tight italic">مراجعة المدربين</h1>
        <p className="text-sm font-bold text-muted-foreground mt-1">
          مراجعة واعتماد طلبات انضمام المدربين الجدد للمنصة
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr className="text-xs font-black text-muted-foreground uppercase tracking-wider">
                <th className="p-5">المدرب</th>
                <th className="p-5">الموقع</th>
                <th className="p-5">السيارة</th>
                <th className="p-5">المستندات</th>
                <th className="p-5">الحالة</th>
                <th className="p-5">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-20 text-center">
                    <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary opacity-50" />
                    <p className="mt-4 font-bold text-muted-foreground">جاري تحميل طلبات المدربين...</p>
                  </td>
                </tr>
              ) : (
                instructors?.map((ins) => {
                  const statusInfo = getStatusDetails(ins.status);
                  return (
                    <tr key={ins.id} className="transition-colors hover:bg-muted/20">
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 border border-border shadow-sm">
                            <AvatarImage src={ins.avatarUrl} />
                            <AvatarFallback className="font-bold bg-primary/10 text-primary">{ins.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-black text-foreground text-base">{ins.name}</div>
                            <div className="text-xs font-bold text-muted-foreground">{ins.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 font-bold text-muted-foreground">{ins.location}</td>
                      <td className="p-5 font-bold text-muted-foreground">{ins.carModel}</td>
                      <td className="p-5">
                        <div className="flex gap-2">
                          <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90" title="البطاقة الشخصية">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline" className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90" title="رخصة القيادة">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-5">
                        <Badge className={`rounded-lg px-3 py-1 font-black border-2 transition-all ${statusInfo.cls}`}>
                          {statusInfo.label}
                        </Badge>
                      </td>
                      <td className="p-5">
                        {ins.status === "pending" ? (
                          <div className="flex gap-2">
                            <Button 
                              size="icon" 
                              disabled={isVerifying}
                              className="h-9 w-9 rounded-xl bg-green-600 hover:bg-green-700 shadow-md shadow-green-200 transition-all hover:-translate-y-0.5 active:scale-90"
                              onClick={() => handleVerify({ id: ins.id, status: 'approved' })}
                            >
                              <CheckCircle2 className="h-5 w-5" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="destructive" 
                              disabled={isVerifying}
                              className="h-9 w-9 rounded-xl shadow-md shadow-red-200 transition-all hover:-translate-y-0.5 active:scale-90"
                              onClick={() => handleVerify({ id: ins.id, status: 'rejected' })}
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="secondary" className="rounded-xl font-bold px-5 transition-all hover:bg-muted-foreground hover:text-white">
                            عرض التفاصيل
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}