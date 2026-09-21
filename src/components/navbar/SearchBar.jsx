import { useEffect, useId, useRef, useState } from 'react';
import { site } from '../../config/site';
import { useNavigate } from 'react-router-dom';
import { Clock, Search, TrendingUp, X, Sprout } from 'lucide-react';
import { searchProducts } from '../../services/api';
import { useDebounce } from '../../hooks/useDebounce';
import { storage } from '../../utils/storage';
import { formatPrice } from '../../utils/format';
import { getFromPrice } from '../../utils/product';

const POPULAR = ['Sunflower', 'Methi', 'Radish', 'Wheatgrass', 'Combos'];
const MAX_RECENT = 5;

const saveRecent = (term) => {
  const list = storage.get('recent_searches', []);
  storage.set('recent_searches', [term, ...list.filter((t) => t.toLowerCase() !== term.toLowerCase())].slice(0, MAX_RECENT));
};

/**
 * Accessible combobox search with live suggestions, recent searches and popular terms.
 * Enter searches the shop; arrow keys move through suggestions.
 */
export default function SearchBar({ autoFocus = false, onNavigate, onSearch, initialValue = '', className = '', size = 'md' }) {
  const [query, setQuery] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState(() => storage.get('recent_searches', []));
  const [active, setActive] = useState(-1);
  const debounced = useDebounce(query, 180);
  const navigate = useNavigate();
  const listId = useId();
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => setQuery(initialValue), [initialValue]);

  // With `onSearch` (Shop page), results filter live as you type — no need to press Enter.
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;
  const initialRef = useRef(initialValue);
  initialRef.current = initialValue;
  useEffect(() => {
    const term = debounced.trim();
    if (onSearchRef.current && term !== initialRef.current) onSearchRef.current(term);
  }, [debounced]);

  useEffect(() => {
    let alive = true;
    if (!debounced.trim()) {
      setResults([]);
      return undefined;
    }
    searchProducts(debounced, 6).then((r) => alive && setResults(r));
    return () => {
      alive = false;
    };
  }, [debounced]);

  useEffect(() => {
    const onClick = (e) => !wrapRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const showingSuggestions = query.trim().length > 0;
  const options = showingSuggestions
    ? results.map((p) => ({ type: 'product', id: p.id, product: p }))
    : [...recent.map((t) => ({ type: 'recent', id: `r-${t}`, term: t })), ...POPULAR.map((t) => ({ type: 'popular', id: `p-${t}`, term: t }))];

  const finish = () => {
    setOpen(false);
    setActive(-1);
    onNavigate?.();
  };

  const submitSearch = (term) => {
    const t = term.trim();
    if (!t && !onSearch) return;
    if (t) {
      saveRecent(t);
      setRecent(storage.get('recent_searches', []));
    }
    setQuery(t);
    if (onSearch) onSearch(t);
    else navigate(`/shop?q=${encodeURIComponent(t)}`);
    finish();
    inputRef.current?.blur();
  };

  const choose = (opt) => {
    if (opt.type === 'product') {
      saveRecent(query.trim() || opt.product.name);
      navigate(`/product/${opt.id}`);
      setQuery('');
      finish();
    } else {
      submitSearch(opt.term);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(-1, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (open && active >= 0 && options[active]) choose(options[active]);
      else submitSearch(query);
    } else if (e.key === 'Escape' && open) {
      e.stopPropagation();
      setOpen(false);
    }
  };

  const clearRecent = () => {
    storage.set('recent_searches', []);
    setRecent([]);
  };

  const inputSize = size === 'lg' ? 'py-4 text-base' : 'py-3 text-sm';

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submitSearch(query);
        }}
      >
        <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-label="Search microgreens"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 && options[active] ? `${listId}-${active}` : undefined}
          autoFocus={autoFocus}
          autoComplete="off"
          placeholder="Search broccoli, methi, मूली…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={`input rounded-full pr-11 pl-12 [&::-webkit-search-cancel-button]:hidden ${inputSize}`}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onSearch?.('');
              inputRef.current?.focus();
            }}
            className="icon-btn absolute top-1/2 right-1.5 size-8 -translate-y-1/2 text-muted"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </form>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 animate-fade-in overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
          <ul id={listId} role="listbox" aria-label="Search suggestions" className="max-h-[60vh] overflow-y-auto p-2">
            {showingSuggestions && results.length === 0 && debounced === query && (
              <li className="px-4 py-6 text-center text-sm text-muted" role="presentation">
                No products match “{query}”. Press Enter to search all.
              </li>
            )}
            {!showingSuggestions && recent.length > 0 && (
              <li role="presentation" className="flex items-center justify-between px-3 pt-2 pb-1">
                <span className="text-xs font-semibold tracking-wider text-muted uppercase">Recent searches</span>
                <button type="button" onClick={clearRecent} className="text-xs font-medium text-brand-700 hover:underline">
                  Clear
                </button>
              </li>
            )}
            {options.map((opt, i) => {
              const header =
                !showingSuggestions && opt.type === 'popular' && (i === 0 || options[i - 1].type !== 'popular') ? (
                  <li key="popular-h" role="presentation" className="px-3 pt-3 pb-1 text-xs font-semibold tracking-wider text-muted uppercase">
                    Popular
                  </li>
                ) : null;
              return [
                header,
                <li
                  key={opt.id}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(opt)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2.5 text-sm ${i === active ? 'bg-brand-50' : ''}`}
                >
                  {opt.type === 'product' ? (
                    <>
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                        <Sprout className="size-5" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium text-brand-950">{opt.product.name}</span>
                        <span className="hindi block text-xs text-muted" lang="hi">
                          {opt.product.hindiName}
                        </span>
                      </span>
                      {site.features.shop && <span className="text-xs font-semibold text-brand-800">from {formatPrice(getFromPrice(opt.product))}</span>}
                    </>
                  ) : (
                    <>
                      {opt.type === 'recent' ? <Clock className="size-4 text-muted" aria-hidden /> : <TrendingUp className="size-4 text-muted" aria-hidden />}
                      <span>{opt.term}</span>
                    </>
                  )}
                </li>,
              ];
            })}
          </ul>
          {showingSuggestions && (
            <button
              type="button"
              onClick={() => submitSearch(query)}
              className="flex w-full items-center justify-center gap-2 border-t border-line py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50"
            >
              <Search className="size-4" aria-hidden /> See all results for “{query}”
            </button>
          )}
        </div>
      )}
    </div>
  );
}
