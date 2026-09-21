import { useMemo, useState } from 'react';
import { site } from '../../config/site';
import { Link } from 'react-router-dom';
import { MessageCircle, Search, SearchX } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useAsync } from '../../hooks/useAsync';
import { getFaqs } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import Accordion from '../../components/common/Accordion';
import { EmptyState } from '../../components/common/States';
import { TextSkeleton } from '../../components/common/Skeletons';

export default function FAQ() {
  usePageMeta('FAQs', 'Answers about microgreens — what they are, how they grow, and how to store and use them.');
  const { data: raw, loading } = useAsync(getFaqs, []);
  // Ordering/payment questions only apply while online selling is on.
  const hidden = site.features.shop ? [] : ['orders', 'payments'];
  const data = raw && { categories: raw.categories.filter((c) => !hidden.includes(c.id)), faqs: raw.faqs.filter((f) => !hidden.includes(f.category)) };
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    return data.faqs.filter(
      (f) => (category === 'all' || f.category === category) && (!q || `${f.question} ${f.answer}`.toLowerCase().includes(q)),
    );
  }, [data, category, query]);

  const groups = data ? data.categories.map((c) => ({ ...c, items: filtered.filter((f) => f.category === c.id) })).filter((g) => g.items.length) : [];

  return (
    <>
      <PageHeader
        title="Frequently asked questions"
        eyebrow="Help centre"
        description={site.features.shop ? 'Everything you need to know about our microgreens, delivery and orders.' : 'Everything you need to know about microgreens — growing, storing and eating them.'}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'FAQs' }]}
      >
        <div className="relative mt-6 max-w-xl">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <label htmlFor="faq-search" className="sr-only">
            Search FAQs
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, e.g. storage, delivery"
            className="input rounded-full py-3.5 pl-12"
          />
        </div>
      </PageHeader>

      <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[240px_1fr]">
        <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0">
            {[{ id: 'all', name: 'All questions' }, ...(data?.categories || [])].map((c) => (
              <li key={c.id} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={category === c.id}
                  onClick={() => setCategory(c.id)}
                  className={`w-full rounded-full px-4 py-2.5 text-left text-sm font-medium transition lg:rounded-2xl ${
                    category === c.id ? 'bg-brand-700 text-white' : 'bg-white text-ink hover:bg-brand-50 lg:bg-transparent'
                  }`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10">
          {loading && <TextSkeleton lines={6} />}
          {!loading && groups.length === 0 && (
            <EmptyState
              icon={SearchX}
              title="No matching questions"
              description="Try another word, or ask us directly."
              action={{ label: 'Clear search', onClick: () => { setQuery(''); setCategory('all'); } }}
              className="card"
            />
          )}
          {groups.map((g) => (
            <section key={g.id} aria-labelledby={`faq-${g.id}`}>
              <h2 id={`faq-${g.id}`} className="mb-4 text-2xl">
                {g.name}
              </h2>
              <Accordion items={g.items.map((f) => ({ id: f.id, title: f.question, content: f.answer }))} />
            </section>
          ))}

          <div className="flex flex-col items-start gap-4 rounded-3xl bg-brand-900 p-8 text-cream-100 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <MessageCircle className="size-10 shrink-0 text-brand-300" aria-hidden />
              <div>
                <h2 className="text-2xl text-white">Still have questions?</h2>
                <p className="text-sm text-cream-100/75">Our team is happy to help on phone, WhatsApp or email.</p>
              </div>
            </div>
            <Link to="/contact" className="btn-accent shrink-0">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
