import { CallToActionSection } from '@/modules/landing/views/CallToActionSection';
import { DiscoverSection } from '@/modules/landing/views/DiscoverSection';
import { FeaturesSection } from '@/modules/landing/views/FeaturesSection';
import { FooterSection } from '@/modules/landing/views/FooterSection';
import { HeroSection } from '@/modules/landing/views/HeroSection';

const Landing = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <DiscoverSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  );
};
export default Landing;
