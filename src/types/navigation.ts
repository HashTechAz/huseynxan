export type NavigationItem = Readonly<{
  label: string;
  href: string;
}>;

export type BreadcrumbItem = Readonly<{
  label: string;
  href?: string;
}>;
