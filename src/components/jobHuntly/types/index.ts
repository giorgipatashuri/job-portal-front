export interface NavLinkProps {
  text: string;
  href: string;
}

export interface SearchInputProps {
  icon: React.ReactNode;
  placeholder: string;
  value?: string;
  defaultValue?: string;
}

export interface PopularSearchProps {
  items: string[];
}
