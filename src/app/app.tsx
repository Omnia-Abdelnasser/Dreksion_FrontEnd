// src/app/app.tsx
import { RouterProvider, createRouter } from '@tanstack/react-router';
// Import the generated route tree from the src folder
// import { routeTree } from '../routeTree.gen';

/**
 * Router Initialization
 * Using the generated routeTree to define all application paths.
 */
const router = createRouter({
  // routeTree,
  // For demonstration, we'll start with an empty route tree.
   // In a real application, the routeTree would be generated based on the files in src/app/routes
});

/**
 * Type Safety Registration
 * This allows TypeScript to provide autocompletion for routes.
 */
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}