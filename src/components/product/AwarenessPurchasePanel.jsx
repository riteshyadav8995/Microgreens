import { useState } from 'react';
import { Mail, MessageCircle, Share2, Link as LinkIcon, Check } from 'lucide-react';
import { site } from '../../config/site';
import { getVariant } from '../../utils/product';
import VariantSelector from './VariantSelector';
import PriceTag from './PriceTag';
import SocialIcon from '../common/SocialIcons';

export default function AwarenessPurchasePanel({ product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [copied, setCopied] = useState(false);
  const variant = getVariant(product, variantId);

  const productUrl = `${window.location.origin}/product/${product.id}`;
  const whatsappMessage = encodeURIComponent(`Hi! I want to enquire about ${product.name} (${variant.label}) priced at ₹${variant.salePrice || variant.price}.`);
  const emailSubject = encodeURIComponent(`Enquiry: ${product.name}`);
  const emailBody = encodeURIComponent(`Hi Mini's Greens team,\n\nI would like to know more about ${product.name} (${variant.label}).\n\nThanks!`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} at Mini's Greens!`,
          url: productUrl,
        });
      } catch (err) {
        console.error('Error sharing', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <PriceTag variant={variant} size="lg" />
        <p className="mt-1 text-xs text-muted">Inclusive of all taxes</p>
      </div>

      <VariantSelector product={product} value={variantId} onChange={setVariantId} showPrice />

      <div className="flex flex-col gap-3 sm:flex-row">
        <a 
          href={`${site.contact.whatsappHref}?text=${whatsappMessage}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-primary flex-1 bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700"
        >
          <MessageCircle className="size-5" /> Enquire on WhatsApp
        </a>
        <a 
          href={`mailto:${site.contact.email}?subject=${emailSubject}&body=${emailBody}`} 
          className="btn-secondary flex-1"
        >
          <Mail className="size-5" /> Email Us
        </a>
      </div>

      <div className="pt-4 border-t border-line">
        <p className="text-sm font-semibold text-brand-950 mb-3 flex items-center gap-2">
          <Share2 className="size-4" /> Share this product
        </p>
        <div className="flex flex-wrap gap-2">
          <a 
            href={`https://wa.me/?text=${encodeURIComponent(`Check out ${product.name} at Mini's Greens: ${productUrl}`)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="chip hover:bg-green-100 hover:text-green-800 transition"
            aria-label="Share on WhatsApp"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="chip hover:bg-blue-100 hover:text-blue-800 transition"
            aria-label="Share on Facebook"
          >
            <SocialIcon name="facebook" className="size-4" /> Facebook
          </a>
          <a 
            href={site.social.instagram}
            target="_blank" 
            rel="noopener noreferrer"
            className="chip hover:bg-pink-100 hover:text-pink-800 transition"
            aria-label="Visit Instagram"
          >
            <SocialIcon name="instagram" className="size-4" /> Instagram
          </a>
          <button 
            onClick={handleCopyLink}
            className="chip hover:bg-brand-100 hover:text-brand-800 transition"
          >
            {copied ? <Check className="size-4 text-green-600" /> : <LinkIcon className="size-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          
          {typeof navigator !== 'undefined' && navigator.share && (
            <button 
              onClick={handleNativeShare}
              className="chip hover:bg-brand-100 hover:text-brand-800 transition sm:hidden"
            >
              <Share2 className="size-4" /> Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
