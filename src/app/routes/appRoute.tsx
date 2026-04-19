import { Route, Routes } from 'react-router-dom';

// Public & Auth
import ForgetPasswordForm from '@/features/auth/components/forgetPwd';
import RegisterForm from '@/features/auth/components/register';
import ResetPasswordForm from '@/features/auth/components/reset_Pwd';
import LoginForm from '../../features/auth/components/login';
import InstructorProfile from '../../features/instructors/components/instructor.$id';
import Home from '../pages/home';
import Instructors from '../pages/instructors';

// Dashboard Layout
import { DashboardLayout } from '@/features/instructor-dashboard/dashboard-layout';

// Dashboard Components
import { InstructorDashboardIndex } from '@/features/instructor-dashboard/components/dashboard.instructor.index';
import { Availability } from '@/features/instructor-dashboard/components/dashboard.instructor.availability';
import { BookingsView } from '@/features/instructor-dashboard/components/dashboard.instructor.bookings';
// Added this line to fix the error
import { InstructorReviews } from '@/features/instructor-dashboard/components/dashboard.instructor.reviews';

const AppRoute = () => {
   return (
      <Routes>
         {/* Public Routes */}
         <Route path='/' element={<LoginForm />} />
         <Route path='/register' element={<RegisterForm />} />
         <Route path='/forget_Pwd' element={<ForgetPasswordForm />} />
         <Route path='/reset_Pwd' element={<ResetPasswordForm />} />
         <Route path='/home' element={<Home />} />
         <Route path='/instructors' element={<Instructors />} />
         <Route path='/instructor/:id' element={<InstructorProfile />} />

         {/* Instructor Dashboard (Nested Routes) */}
         <Route
            path='/dashboard/instructor'
            element={<DashboardLayout role='instructor' />}
         >
            <Route index element={<InstructorDashboardIndex />} />
            <Route path='availability' element={<Availability />} />
            <Route path='bookings' element={<BookingsView />} />
            <Route path='reviews' element={<InstructorReviews />} />
         </Route>

         {/* Fallback for 404 */}
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