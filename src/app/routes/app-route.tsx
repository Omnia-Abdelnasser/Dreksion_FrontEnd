import { Route, Routes } from 'react-router-dom';

// Public & Auth Features
import ConfirmEmailForm from '@/features/auth/components/confirm-email';
import ForgetPasswordForm from '@/features/auth/components/forget-password';
import RegisterForm from '@/features/auth/components/register';
import ResetPasswordForm from '@/features/auth/components/reset-password';
import LoginForm from '../../features/auth/components/login';

// Dashboard Components (Instructor)
import { InstructorChat } from '@/features/dashboard.chat';
import BookingPage from '@/features/instructor-dashboard/components/booking.$id';
import { Availability } from '@/features/instructor-dashboard/components/dashboard.instructor.availability';
import { BookingsView } from '@/features/instructor-dashboard/components/dashboard.instructor.bookings';
import { InstructorDashboardIndex } from '@/features/instructor-dashboard/components/dashboard.instructor.index';
import { InstructorProfile } from '@/features/instructor-dashboard/components/dashboard.instructor.profile';
import { InstructorReviews } from '@/features/instructor-dashboard/components/dashboard.instructor.reviews';
import { InstructorStudents } from '@/features/instructor-dashboard/components/dashboard.instructor.students';
import { DashboardLayout } from '@/features/instructor-dashboard/dashboard-layout';

// --- Admin Features (The part we added) ---
import { 
  AdminDashboardIndex, 
  InstructorsReview, 
  AdminUsers, 
  AdminSettings 
} from '@/features/dashboard-admin/components/admin-components'; 

// Public Pages
import Home from '../pages/home';
import Instructors from '../pages/instructors';
import PublicProfile from '../../features/instructors/components/instructor.$id';

const AppRoute = () => {
   return (
      <Routes>
         {/* Public Routes */}
         <Route path='/' element={<Home />} />
         <Route path='/login' element={<LoginForm />} />
         <Route path='/register' element={<RegisterForm />} />
         <Route path='/forget_Pwd' element={<ForgetPasswordForm />} />
         <Route path='/reset_Pwd' element={<ResetPasswordForm />} />
         <Route path='/confirmEmail' element={<ConfirmEmailForm />} />
         <Route path='/instructors' element={<Instructors />} />
         <Route path='/instructor/:id' element={<PublicProfile />} />
         <Route path='/booking/:id' element={<BookingPage />} />
         
         {/* Instructor Dashboard (Nested Routes) */}
         <Route
            path='/dashboard/instructor'
            element={<DashboardLayout role='instructor' />}
         >
            <Route index element={<InstructorDashboardIndex />} />
            <Route path='availability' element={<Availability />} />
            <Route path='bookings' element={<BookingsView />} />
            <Route path='reviews' element={<InstructorReviews />} />
            <Route path='students' element={<InstructorStudents />} />
            <Route path='profile' element={<InstructorProfile />} />
            <Route path='chat' element={<InstructorChat />} />
         </Route>

         {/* Admin Dashboard (Added by Taha) */}
         <Route
            path='/dashboard/admin'
            element={<DashboardLayout role='admin' />}
         >
            {/* Main Admin Overview */}
            <Route index element={<AdminDashboardIndex />} />
            
            {/* Review New Instructor Requests */}
            <Route path='instructors' element={<InstructorsReview />} />
            
            {/* Manage Platform Users */}
            <Route path='users' element={<AdminUsers />} />
            
            {/* System Configurations */}
            <Route path='settings' element={<AdminSettings />} />
         </Route>

         {/* 404 Fallback */}
         <Route
            path='*'
            element={
               <div className='flex h-screen items-center justify-center font-bold'>
                  404 - Page Not Found
               </div>
            }
         />
      </Routes>
   );
};

export default AppRoute;