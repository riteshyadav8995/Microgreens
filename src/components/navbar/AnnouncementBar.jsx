import { useEffect, useState } from 'react';
import { site } from '../../config/site';

const messages = site.features.shop
  ? [
      `Free delivery on orders above ₹${site.delivery.freeDeliveryThreshold}`,
      'Use code FRESH10 for 10% off your order',
      `Now delivering in ${site.delivery.zones.map((z) => z.city).join(' · ')}`,
    ]
  : [
      'New to microgreens? Start with “What are microgreens?” in the Learn menu',
      'Most microgreens go from seed to harvest in about 7–21 days',
      'Online ordering is coming soon — follow us for updates',
    ];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-brand-900 text-cream-100">
      <div className="container-page flex h-9 items-center justify-center text-center text-xs font-medium tracking-wide sm:text-[0.8rem]">
        <p key={index} className="animate-fade-in truncate" aria-live="off">
          {messages[index]}
        </p>
      </div>
    </div>
  );
}
