import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

/**
 * Extended Props to support dynamic routing and custom active/pending states
 */
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  isExternal?: boolean; // New prop to handle external dynamic links
}

/**
 * Dynamic NavLink Component
 * Automatically switches between React Router and standard anchor tags based on the URL
 */
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, isExternal, ...props }, ref) => {
    
    // Logic: Check if the link is external (starts with http, mailto, or tel)
    const isExternalLink = typeof to === 'string' && (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')) || isExternal;

if (isExternalLink) {
      return (
        <a
          ref={ref}
          href={to as string}
          className={cn(className)}
          target="_blank"
          rel="noopener noreferrer"
          // Spread props but exclude children to handle it manually
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {/* Logic: Check if children is a function (NavLink render prop).
            If it's a function, call it with default states since <a> doesn't have isActive 
          */}
          {typeof props.children === "function"
            ? props.children({ isActive: false, isPending: false, isTransitioning: false })
            : props.children}
        </a>
      );
    }

    // Default: Internal routing with dynamic Active/Pending state handling
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(
            className, 
            isActive && activeClassName, 
            isPending && pendingClassName
          )
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };