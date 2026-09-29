import Container from '@/components/common/Container';
import { EditorialPageHeader } from '@/components/field-notes/EditorialPageHeader';
import { RuledSection } from '@/components/field-notes/RuledSection';
import { SectionLabel } from '@/components/field-notes/SectionLabel';
import GearCard from '@/components/gears/GearCard';
import { devices, software, webExtensions } from '@/config/Gears';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...getMetadata('/gears'),
  robots: { index: true, follow: true },
};

export default function GearsPage() {
  return (
    <Container>
      <EditorialPageHeader
        index="01"
        eyebrow="Tools of the work"
        title="Hardware, software, and small conveniences."
        description="The practical setup behind the systems: devices I use, software I reach for, and browser extensions that remove friction."
      />

      <GearSection index="02" title="Devices">
        {devices.map((device, index) => (
          <GearCard key={device.name} index={index + 1} {...device} />
        ))}
      </GearSection>

      <GearSection index="03" title="Software">
        {software.map((item, index) => (
          <GearCard key={item.name} index={index + 1} {...item} />
        ))}
      </GearSection>

      <GearSection index="04" title="Browser extensions">
        {webExtensions.map((item, index) => (
          <GearCard key={item.name} index={index + 1} {...item} />
        ))}
      </GearSection>
    </Container>
  );
}

function GearSection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <RuledSection>
      <SectionLabel index={index}>{title}</SectionLabel>
      <div className="mt-8 grid gap-x-10 lg:grid-cols-2">{children}</div>
    </RuledSection>
  );
}
