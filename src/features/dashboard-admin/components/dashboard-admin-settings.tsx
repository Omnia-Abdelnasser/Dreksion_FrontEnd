import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Loader2,
  Save,
  Settings as SettingsIcon,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { api } from '@/shared/lib/api';

// Assuming your axios instance path

// 1. Service functions
const getSettings = async () => {
   const res = await api.get('/admin/settings');
   return res.data;
};

const updateSettings = async (settings: any) => {
   const res = await api.patch('/admin/settings', settings);
   return res.data;
};

export function AdminSettings() {
   const queryClient = useQueryClient();

   // 2. Fetch current settings
   const { data: settings, isLoading } = useQuery({
      queryKey: ['system-settings'],
      queryFn: getSettings,
   });

   // 3. Mutation for saving changes
   const { mutate: saveSettings, isPending: isSaving } = useMutation({
      mutationFn: updateSettings,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['system-settings'] });
         toast.success('تم تحديث إعدادات النظام بنجاح');
      },
      onError: () => toast.error('فشل في تحديث الإعدادات'),
   });

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      saveSettings(data);
   };

   if (isLoading)
      return (
         <div className='flex justify-center p-20'>
            <Loader2 className='h-10 w-10 animate-spin text-primary' />
         </div>
      );

   return (
      <form onSubmit={handleSubmit} className='space-y-8 p-1' dir='rtl'>
         <div className='flex flex-col gap-1'>
            <h1 className='flex items-center gap-3 text-3xl font-black tracking-tight text-foreground'>
               <SettingsIcon className='h-8 w-8 text-primary' />
               إعدادات النظام
            </h1>
            <p className='mt-1 text-sm font-bold text-muted-foreground'>
               إدارة معايير المنصة وسياسات الأمان العامة
            </p>
         </div>

         <div className='grid gap-8 lg:grid-cols-3'>
            <div className='space-y-6 lg:col-span-2'>
               <div className='rounded-3xl border border-border bg-card p-8 shadow-sm'>
                  <h3 className='mb-6 border-b border-border pb-4 text-xl font-black italic text-foreground'>
                     الإعدادات العامة
                  </h3>
                  <div className='grid gap-6 md:grid-cols-2'>
                     <div className='space-y-2'>
                        <Label className='text-sm font-bold'>اسم المنصة</Label>
                        <Input
                           name='platformName'
                           defaultValue={settings?.platformName || 'دِركسيون'}
                           className='h-12 rounded-xl font-bold'
                        />
                     </div>
                     <div className='space-y-2'>
                        <Label className='text-sm font-bold'>العمولة (%)</Label>
                        <Input
                           name='commission'
                           type='number'
                           defaultValue={settings?.commission || 10}
                           className='h-12 rounded-xl font-bold'
                        />
                     </div>
                  </div>
               </div>

               <div className='rounded-3xl border border-border bg-card p-8 shadow-sm'>
                  <h3 className='mb-6 border-b border-border pb-4 text-xl font-black italic text-foreground'>
                     الأمان والخصوصية
                  </h3>
                  <div className='space-y-4'>
                     <div className='flex items-center justify-between rounded-2xl border border-border bg-muted/30 p-5'>
                        <div className='flex items-start gap-4'>
                           <div className='mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                              <Shield className='h-5 w-5' />
                           </div>
                           <div>
                              <div className='font-black text-foreground'>
                                 التحقق التلقائي (AI)
                              </div>
                              <div className='mt-1 max-w-xs text-xs font-bold text-muted-foreground'>
                                 تفعيل التحقق الفوري من بيانات المدربين
                              </div>
                           </div>
                        </div>
                        <Switch
                           name='autoVerify'
                           defaultChecked={settings?.autoVerify}
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div className='space-y-6'>
               <div className='rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg shadow-primary/20'>
                  <h4 className='mb-2 text-lg font-black tracking-tight'>
                     تحديث النظام
                  </h4>
                  <p className='text-sm font-medium leading-relaxed opacity-90'>
                     تأكد من مراجعة العمولات والأسعار بشكل دوري.
                  </p>
                  <Button
                     type='submit'
                     disabled={isSaving}
                     className='mt-6 h-12 w-full rounded-2xl bg-white font-black text-primary shadow-md hover:bg-white/90 active:scale-95'
                  >
                     {isSaving ? (
                        <Loader2 className='ml-2 h-5 w-5 animate-spin' />
                     ) : (
                        <Save className='ml-2 h-5 w-5' />
                     )}
                     حفظ التغييرات
                  </Button>
               </div>
            </div>
         </div>
      </form>
   );
}
