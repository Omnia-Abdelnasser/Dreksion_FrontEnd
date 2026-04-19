import { Toaster } from "sonner";
import AppRoute from "./routes/appRoute";
export default function App() {
   return (
    <>
        <Toaster richColors position="top-right" />
    <AppRoute />
    </>
   );
}
