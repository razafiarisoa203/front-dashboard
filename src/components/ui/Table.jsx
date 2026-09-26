import { cn } from '@/lib/utils'

export function Table({ className, ...props }) {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn('w-full border-collapse text-left text-sm', className)}
        {...props}
      />
    </div>
  )
}

export function THead({ children }) {
  return (
    <thead className="border-b border-slate-200 bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
      {children}
    </thead>
  )
}

export function TH({ className, ...props }) {
  return <th className={cn('px-4 py-3 font-semibold', className)} {...props} />
}

export function TBody({ children }) {
  return <tbody className="divide-y divide-slate-100">{children}</tbody>
}

export function TR({ className, ...props }) {
  return <tr className={cn('hover:bg-slate-50', className)} {...props} />
}

export function TD({ className, ...props }) {
  return <td className={cn('px-4 py-3 text-slate-700', className)} {...props} />
}
