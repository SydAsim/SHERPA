import React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(
  ({ className, type = 'text', accept, multiple, ...props }, ref) => {
    const isFile = type === 'file';

    return (
      <input
        type={type}
        accept={accept}
        multiple={multiple}
        ref={ref}
        className={cn(
          isFile
            ? 'block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700'
            : 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
