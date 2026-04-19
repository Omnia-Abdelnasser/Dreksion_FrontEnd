import { Route, Routes } from 'react-router-dom';

import ForgetPasswordForm from '@/features/auth/components/forgetPwd';
import RegisterForm from '@/features/auth/components/register';
import ResetPasswordForm from '@/features/auth/components/reset_Pwd';

import LoginForm from '../../features/auth/components/login';
import InstructorProfile from '../../features/instructors/components/instructor.$id';
import Home from '../pages/home';
import Instructors from '../pages/instructors';

const AppRoute = () => {
   return (
      <Routes>
         <Route path='/' element={<LoginForm />} />
         <Route path='/register' element={<RegisterForm />} />
         <Route path='/forget_Pwd' element={<ForgetPasswordForm />} />
         <Route path='/reset_Pwd' element={<ResetPasswordForm />} />
         <Route path='/home' element={<Home />} />
         <Route path='/instructors' element={<Instructors />} />
         <Route path='/instructor/:id' element={<InstructorProfile />} />
      </Routes>
   );
};

export default AppRoute;
