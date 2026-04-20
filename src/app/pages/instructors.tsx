import InstructorFilters from '@/features/instructors/components/instructor-filters';
import Footer from '@/shared/components/footer';
import Navbar from '../layouts/navbar';

const Instructors = () => {
   return (
      <main className='min-h-screen  text-foreground'> 
         <Navbar />
      
            <InstructorFilters />         
         <Footer />
      </main>
   );
};

export default Instructors;