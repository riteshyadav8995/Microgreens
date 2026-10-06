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
      <div className="container-page grid min-h-9 items-center py-2 text-center text-xs leading-relaxed font-medium tracking-wide sm:text-[0.8rem]">
        {messages.map((message, i) => (
          <p key={message} className={`col-start-1 row-start-1 ${i === index ? 'animate-fade-in' : 'invisible'}`} aria-hidden={i !== index}>
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}
