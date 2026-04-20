import { Toaster } from "sonner";
import AppRoute from "./routes/app-route";
export default function App() {
   return (
    <>
        <Toaster richColors position="top-right" />
    <AppRoute />
    </>
   );
}