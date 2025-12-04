// src/app/(public)/layout.tsx
import PublicHeader from '@/app/components/PublicHeader';
import PublicFooter from '@/app/components/PublicFooter';
import InteractiveFooter from '../components/InteractiveServices';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Apply the dark theme background here
    <div className="bg-dark-background text-dark-text_primary">
      <PublicHeader />
      <main>{children}</main>
      <InteractiveFooter />
    </div>
  );
}