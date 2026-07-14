import type { ReactNode } from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center border border-border bg-surface px-6 py-12 text-center">
      {icon ? <div className="mb-6 text-antique-gold" aria-hidden="true">{icon}</div> : null}
      <h3 className="text-heading-md">{title}</h3>
      {description ? <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
