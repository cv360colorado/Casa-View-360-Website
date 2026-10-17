import React, { useState } from 'react';
import { PropertyListing } from '../types';
import { INITIAL_PROPERTIES, SANITY_SCHEMAS, SAMPLE_GROQ_QUERIES } from '../data/mockData';
import {
  Database,
  Code2,
  FileCode,
  Settings,
  Play,
  Plus,
  Check,
  ExternalLink,
  Copy,
  RefreshCw
} from 'lucide-react';

interface SanityStudioProps {
  properties: PropertyListing[];
  onUpdateProperties: (properties: PropertyListing[]) => void;
}

export const SanityStudio: React.FC<SanityStudioProps> = ({
  properties,
  onUpdateProperties,
}) => {
  const [activeTab, setActiveTab] = useState<'desk' | 'groq' | 'schemas' | 'config'>('desk');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(properties[0]?._id || '');

  // GROQ Playground state
  const [currentGroqQuery, setCurrentGroqQuery] = useState<string>(SAMPLE_GROQ_QUERIES[0].groq);
  const [groqResult, setGroqResult] = useState<string>('');
  const [isExecutingGroq, setIsExecutingGroq] = useState<boolean>(false);
  const [copyCodeSuccess, setCopyCodeSuccess] = useState<boolean>(false);

  // Sanity Config state
  const [sanityProjectId, setSanityProjectId] = useState<string>('casaview360');
  const [sanityDataset, setSanityDataset] = useState<string>('production');
  const [useCdn, setUseCdn] = useState<boolean>(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'testing'>('connected');

  const selectedProperty = properties.find((p) => p._id === selectedPropertyId) || properties[0];

  // Property editor local state
  const [editTitle, setEditTitle] = useState(selectedProperty?.title || '');
  const [editPrice, setEditPrice] = useState(selectedProperty?.listPrice || 0);
  const [editSqFt, setEditSqFt] = useState(selectedProperty?.squareFeet || 0);
  const [editStatus, setEditStatus] = useState(selectedProperty?.status || 'published');
  const [editNotes, setEditNotes] = useState(selectedProperty?.photographerNotes || '');
  const [editTwilightType, setEditTwilightType] = useState<'virtual' | 'on-site' | 'none'>(
    selectedProperty?.twilightType || 'none'
  );
  const [editHasStaging, setEditHasStaging] = useState<boolean>(
    selectedProperty?.hasVirtualStaging || false
  );
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Sync editor fields when selection changes
  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id);
    const prop = properties.find((p) => p._id === id);
    if (prop) {
      setEditTitle(prop.title);
      setEditPrice(prop.listPrice);
      setEditSqFt(prop.squareFeet);
      setEditStatus(prop.status);
      setEditNotes(prop.photographerNotes || '');
      setEditTwilightType(prop.twilightType || 'none');
      setEditHasStaging(prop.hasVirtualStaging || false);
    }
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = properties.map((p) => {
      if (p._id === selectedPropertyId) {
        return {
          ...p,
          title: editTitle,
          listPrice: editPrice,
          squareFeet: editSqFt,
          status: editStatus as 'published' | 'draft' | 'archived',
          photographerNotes: editNotes,
          twilightType: editTwilightType,
          hasVirtualStaging: editHasStaging,
        };
      }
      return p;
    });

    onUpdateProperties(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleCreateNewProperty = () => {
    const newId = `prop-${Date.now().toString().slice(-4)}`;
    const newProp: PropertyListing = {
      _id: newId,
      _type: 'property',
      title: 'New Ground Real Estate Shoot',
      slug: `new-ground-shoot-${newId}`,
      address: '1000 Bel Air Crest Rd',
      city: 'Los Angeles, CA',
      listPrice: 18500000,
      squareFeet: 6800,
      bedrooms: 5,
      bathrooms: 6,
      heroImage: properties[0].heroImage,
      gallery: properties[0].gallery,
      category: 'ground-stills',
      twilightType: 'virtual',
      hasVirtualStaging: true,
      hasSinglePropertyWebsite: true,
      singlePropertyWebsiteUrl: `https://${newId}.luxemarkmedia.com`,
      featured: true,
      status: 'published',
      photographerNotes: 'Basic interior and exterior ground photos captured at 5ft eye-level tripod.',
      clientName: 'Luxury Real Estate Group',
      mlsNumber: `MLS-${Math.floor(1000000 + Math.random() * 9000000)}`,
    };

    const updated = [newProp, ...properties];
    onUpdateProperties(updated);
    setSelectedPropertyId(newId);
    setEditTitle(newProp.title);
    setEditPrice(newProp.listPrice);
    setEditSqFt(newProp.squareFeet);
    setEditStatus(newProp.status);
    setEditNotes(newProp.photographerNotes || '');
    setEditTwilightType(newProp.twilightType || 'none');
    setEditHasStaging(newProp.hasVirtualStaging || false);
  };

  // Run GROQ Query simulation
  const executeGroq = () => {
    setIsExecutingGroq(true);
    setTimeout(() => {
      let filtered = [...properties];
      if (currentGroqQuery.includes('status == "published"')) {
        filtered = filtered.filter((p) => p.status === 'published');
      }
      if (currentGroqQuery.includes('featured == true')) {
        filtered = filtered.filter((p) => p.featured);
      }
      if (currentGroqQuery.includes('order(listPrice desc)')) {
        filtered = filtered.sort((a, b) => b.listPrice - a.listPrice);
      }

      const formatted = JSON.stringify(
        {
          query: currentGroqQuery.trim(),
          result: filtered.map((p) => ({
            _id: p._id,
            _type: p._type,
            title: p.title,
            address: p.address,
            city: p.city,
            listPrice: p.listPrice,
            squareFeet: p.squareFeet,
            heroUrl: p.heroImage,
            status: p.status,
            twilightType: p.twilightType,
            hasVirtualStaging: p.hasVirtualStaging,
            singlePropertyWebsiteUrl: p.singlePropertyWebsiteUrl,
            photographerNotes: p.photographerNotes,
          })),
          ms: Math.floor(8 + Math.random() * 12),
        },
        null,
        2
      );

      setGroqResult(formatted);
      setIsExecutingGroq(false);
    }, 250);
  };

  // Execute initial GROQ query on mount or tab change
  React.useEffect(() => {
    if (activeTab === 'groq' && !groqResult) {
      executeGroq();
    }
  }, [activeTab]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopyCodeSuccess(true);
    setTimeout(() => setCopyCodeSuccess(false), 2000);
  };

  return (
    <section id="sanity-studio" className="w-full py-20 bg-[#0c0d0e] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-rose-500 uppercase font-mono mb-2">
              <span>Sanity v3 Content Lake</span>
              <span aria-hidden="true">·</span>
              <span>Headless Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-medium">
              Sanity Studio CMS & GROQ Engine
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
              Manage architectural listings, twilight conversion flags, and photographer technical
              notes with real-time GROQ query simulation and structured schemas.
            </p>
          </div>

          {/* Studio Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-sm">
            <button
              onClick={() => setActiveTab('desk')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors flex items-center gap-1.5 ${
                activeTab === 'desk'
                  ? 'bg-rose-500 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Desk Structure</span>
            </button>
            <button
              onClick={() => setActiveTab('groq')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors flex items-center gap-1.5 ${
                activeTab === 'groq'
                  ? 'bg-rose-500 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>GROQ Playground</span>
            </button>
            <button
              onClick={() => setActiveTab('schemas')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors flex items-center gap-1.5 ${
                activeTab === 'schemas'
                  ? 'bg-rose-500 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Schemas</span>
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`px-3 py-1.5 text-xs font-mono rounded-sm transition-colors flex items-center gap-1.5 ${
                activeTab === 'config'
                  ? 'bg-rose-500 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Configuration</span>
            </button>
          </div>
        </div>

        {/* Studio Body Container */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden min-h-[580px]">
          {/* Top Bar of Studio */}
          <div className="px-6 py-3 border-b border-zinc-800 bg-zinc-900/70 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="font-bold text-rose-500">SANITY STUDIO</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300">dataset: {sanityDataset}</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">project: {sanityProjectId}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-zinc-400">Content Lake Synced</span>
            </div>
          </div>

          {/* TAB 1: DESK STRUCTURE / PROPERTY MANAGER */}
          {activeTab === 'desk' && (
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
              {/* Document Tree Sidebar (Left 4 cols) */}
              <div className="md:col-span-4 border-r border-zinc-800 p-4 bg-zinc-950/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      Property Documents ({properties.length})
                    </span>
                    <button
                      onClick={handleCreateNewProperty}
                      className="p-1 text-zinc-400 hover:text-rose-400 rounded-sm hover:bg-zinc-900 transition-colors flex items-center gap-1 text-[11px] font-mono"
                      title="Add new property document"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New</span>
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {properties.map((prop) => {
                      const isSelected = prop._id === selectedPropertyId;
                      return (
                        <div
                          key={prop._id}
                          onClick={() => handleSelectProperty(prop._id)}
                          className={`p-3 rounded-sm cursor-pointer border transition-colors ${
                            isSelected
                              ? 'bg-zinc-900 border-rose-500/80 text-white'
                              : 'border-zinc-900 hover:border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-white truncate max-w-[200px]">
                              {prop.title}
                            </span>
                            <span
                              className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-xs ${
                                prop.status === 'published'
                                  ? 'bg-emerald-950/60 text-emerald-400'
                                  : 'bg-amber-950/60 text-amber-400'
                              }`}
                            >
                              {prop.status}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-zinc-500 mt-1 flex justify-between">
                            <span>{prop.city}</span>
                            <span className="tabular-nums">
                              ${(prop.listPrice / 1000000).toFixed(1)}M
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-500">
                  Schema: <code className="text-zinc-300">schemaTypes/property.ts</code>
                </div>
              </div>

              {/* Document Editor Pane (Right 8 cols) */}
              <div className="md:col-span-8 p-6 bg-zinc-950 overflow-y-auto">
                <form onSubmit={handleSaveProperty} className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                    <div>
                      <h4 className="text-base font-medium text-white">Document: {editTitle}</h4>
                      <div className="text-xs font-mono text-zinc-500">_id: {selectedProperty._id}</div>
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold tracking-wider text-white bg-rose-600 hover:bg-rose-500 rounded-sm uppercase transition-colors flex items-center gap-1.5"
                    >
                      {saveSuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </>
                      ) : (
                        <span>Publish Changes</span>
                      )}
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      Property Title
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-sm text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                        List Price (USD)
                      </label>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                        Square Footage
                      </label>
                      <input
                        type="number"
                        value={editSqFt}
                        onChange={(e) => setEditSqFt(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                        Publication Status
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as 'published' | 'draft')}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-rose-500"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft (Review Pending)</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                        Twilight Lighting Type
                      </label>
                      <select
                        value={editTwilightType}
                        onChange={(e) => setEditTwilightType(e.target.value as 'virtual' | 'on-site' | 'none')}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-rose-500"
                      >
                        <option value="none">Standard Daytime Stills</option>
                        <option value="virtual">Virtual Day-to-Dusk</option>
                        <option value="on-site">On-Site Blue Hour Twilight</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="hasVirtualStaging"
                        checked={editHasStaging}
                        onChange={(e) => setEditHasStaging(e.target.checked)}
                        className="w-4 h-4 rounded-xs border-zinc-700 bg-zinc-900 text-rose-500 focus:ring-0"
                      />
                      <label htmlFor="hasVirtualStaging" className="text-xs text-zinc-300 font-mono">
                        Virtual Staging Applied
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                      Photographer Retouching & Lighting Notes
                    </label>
                    <textarea
                      rows={3}
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-xs text-zinc-200 focus:outline-none focus:border-rose-500 font-sans"
                    />
                  </div>

                  {/* Hero Photo Preview in Sanity Studio */}
                  <div className="pt-2">
                    <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                      Hero Asset Hotspot Preview
                    </label>
                    <div className="relative aspect-[16/9] max-h-48 rounded-sm overflow-hidden border border-zinc-800">
                      <img
                        src={selectedProperty.heroImage}
                        alt="Sanity Asset"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 rounded-xs text-[10px] font-mono text-rose-300">
                        Sanity Image Asset (Hotspot Crop: Center)
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: GROQ QUERY PLAYGROUND */}
          {activeTab === 'groq' && (
            <div className="p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400 uppercase">Presets:</span>
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_GROQ_QUERIES.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setCurrentGroqQuery(preset.groq);
                          setTimeout(executeGroq, 50);
                        }}
                        className="px-2.5 py-1 text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-sm transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={executeGroq}
                  disabled={isExecutingGroq}
                  className="px-4 py-2 text-xs font-mono font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-sm flex items-center gap-1.5 transition-colors self-end lg:self-auto"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isExecutingGroq ? 'Executing...' : 'Run GROQ Query'}</span>
                </button>
              </div>

              {/* Editor Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Query Input (Left 6 cols) */}
                <div className="lg:col-span-6 flex flex-col">
                  <label className="text-xs font-mono text-zinc-400 uppercase mb-2">
                    GROQ Query Input
                  </label>
                  <textarea
                    rows={12}
                    value={currentGroqQuery}
                    onChange={(e) => setCurrentGroqQuery(e.target.value)}
                    className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-sm font-mono text-xs text-rose-300 focus:outline-none focus:border-rose-500 resize-none h-[340px]"
                    spellCheck={false}
                  />
                </div>

                {/* Query JSON Output (Right 6 cols) */}
                <div className="lg:col-span-6 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase">
                      Execution Result (JSON)
                    </span>
                    <button
                      onClick={() => handleCopyCode(groqResult)}
                      className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                    >
                      {copyCodeSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copyCodeSuccess ? 'Copied' : 'Copy JSON'}</span>
                    </button>
                  </div>
                  <pre className="w-full p-4 bg-zinc-900/90 border border-zinc-800 rounded-sm font-mono text-xs text-emerald-400 overflow-auto h-[340px]">
                    {groqResult || '// Click "Run GROQ Query" to fetch results from Sanity Lake'}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCHEMAS INSPECTOR */}
          {activeTab === 'schemas' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SANITY_SCHEMAS.map((schema) => (
                  <div
                    key={schema.name}
                    className="p-5 bg-zinc-900 border border-zinc-800 rounded-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-white font-mono">{schema.title}</span>
                        <span className="text-[10px] font-mono bg-zinc-800 px-2 py-0.5 rounded-xs text-rose-400">
                          {schema.type}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-zinc-500 mb-4">
                        Name: <code className="text-zinc-300">{schema.name}</code>
                      </div>

                      <div className="space-y-2 border-t border-zinc-800 pt-3">
                        <div className="text-[11px] font-mono text-zinc-400 uppercase">Defined Fields:</div>
                        {schema.fields.map((field) => (
                          <div
                            key={field.name}
                            className="flex items-center justify-between text-xs font-mono text-zinc-300 py-0.5"
                          >
                            <span className="text-zinc-200">{field.name}</span>
                            <span className="text-zinc-500 text-[11px]">{field.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleCopyCode(
                          `export default {\n  name: '${schema.name}',\n  title: '${schema.title}',\n  type: '${schema.type}',\n  fields: ${JSON.stringify(schema.fields, null, 2)}\n}`
                        )
                      }
                      className="mt-6 w-full py-2 text-xs font-mono bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Schema TS</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SANITY CONFIGURATION */}
          {activeTab === 'config' && (
            <div className="p-6 max-w-2xl">
              <h4 className="text-base font-medium text-white mb-4">Sanity Studio Client Settings</h4>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Sanity Project ID
                  </label>
                  <input
                    type="text"
                    value={sanityProjectId}
                    onChange={(e) => setSanityProjectId(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-rose-500"
                  />
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Found in your sanity.io/manage project dashboard
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Dataset Name
                  </label>
                  <input
                    type="text"
                    value={sanityDataset}
                    onChange={(e) => setSanityDataset(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-sm text-sm text-white font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="cdnToggle"
                    checked={useCdn}
                    onChange={(e) => setUseCdn(e.target.checked)}
                    className="w-4 h-4 rounded-xs border-zinc-700 bg-zinc-900 text-rose-500 focus:ring-0"
                  />
                  <label htmlFor="cdnToggle" className="text-xs text-zinc-300 font-mono">
                    Enable Edge CDN (Cache-Control: public, max-age=60)
                  </label>
                </div>

                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-sm mt-6">
                  <div className="text-xs font-mono text-zinc-400 uppercase mb-2">
                    Client Integration Snippet
                  </div>
                  <pre className="text-xs font-mono text-rose-300 overflow-x-auto">
{`import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '${sanityProjectId}',
  dataset: '${sanityDataset}',
  useCdn: ${useCdn},
  apiVersion: '2026-03-01',
});`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
