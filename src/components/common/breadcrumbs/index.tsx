// Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { breadcrumbMap } from '@/lib/breadcrumbMap';

const Breadcrumbs = () => {
  const location = useLocation();

  // Get current URL segments
  const pathnames = location.pathname.split('/').filter(x => x);

  // Build breadcrumb paths dynamically
  const breadcrumbPaths = pathnames.map((_, index) => {
    return '/' + pathnames.slice(0, index + 1).join('/');
  });

  return (
    <Breadcrumb className="mt-10 mb-6 mx-10">
      <BreadcrumbList>
        {/* Home breadcrumb */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">{breadcrumbMap['/']}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbPaths.map((path, index) => {
          const isLast = index === breadcrumbPaths.length - 1;

          return (
            <React.Fragment key={path}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{breadcrumbMap[path]}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={path}>{breadcrumbMap[path]}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
