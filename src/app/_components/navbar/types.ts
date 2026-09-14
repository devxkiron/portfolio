export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarVariantProps {
  brandOverride?: {
    name?: string;
    logoType?: string;
    logoUrl?: string;
  };
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
