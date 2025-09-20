'use client'
import { useState, useRef, useEffect, useMemo } from 'react'
import {
  Sparkles, Loader2, Copy, Check, Github, Linkedin, Mail, ArrowRight,
  FileText, Twitter, Clapperboard, Layers, Youtube, Lightbulb, File, Play
} from 'lucide-react'

const contentTypes = [
  { id: 'blog', name: 'Blog Posts', icon: <FileText /> },
  { id: 'tweet', name: 'Tweets', icon: <Twitter /> },
  { id: 'reels', name: 'Reels/Shorts', icon: <Clapperboard /> },
  { id: 'carousel', name: 'Carousels', icon: <Layers /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin /> },
  { id: 'long_form_video', name: 'YouTube', icon: <Youtube /> },
]

const FloatingIconsBackground = () => (
  <div className="absolute inset-0 w-full h-full pointer-events-none">
    <Lightbulb size={60} className="floating-icon i1" />
    <File size={50} className="floating-icon i2" />
    <Play size={70} className="floating-icon i3" />
    <Sparkles size={40} className="floating-icon i4" />
    <Layers size={55} className="floating-icon i5" />
    <Clapperboard size={65} className="floating-icon i6" />
  </div>
);

const BoldText = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-bold text-purple-400">{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </>
  );
};

export default function Home() {
  const [niche, setNiche] = useState('')
  const [contentType, setContentType] = useState('blog')
  const [isLoading, setIsLoading] = useState(false)
  const [ideas, setIdeas] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false);
  const resultsRef = useRef(null);

  const sloganWords = useMemo(() => "Turn your niche into endless content ideas.".split(' '), []);
  const sloganColors = [
    'text-slogan-1', 'text-slogan-2', 'text-slogan-3', 'text-slogan-4',
    'text-slogan-5', 'text-slogan-6', 'text-slogan-7',
  ];

  useEffect(() => {
    if (ideas && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [ideas]);

  const generateIdeas = async () => {
    if (!niche.trim()) {
      setError('Please enter a niche')
      return
    }
    setIsLoading(true)
    setError('')
    setIdeas('')
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche: niche.trim(), contentType }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate ideas')
      }
      setIdeas(data.ideas)
    } catch (err) {
      setError(err.message || 'Failed to generate ideas')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ideas)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('memudabdulmalik11@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      <FloatingIconsBackground />
      <header className="absolute top-0 left-0 right-0 p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm">
            <p className="font-semibold">By Abdulmalik Memud</p>
            <div className="flex items-center space-x-2">
              <a href="mailto:memudabdulmalik11@gmail.com" className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm truncate">
                memudabdulmalik11@gmail.com
              </a>
              <button onClick={copyEmailToClipboard} className="text-gray-400 hover:text-white transition-colors flex-shrink-0">
                {emailCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/ayomidemalik" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github size={24} /></a>
            <a href="https://linkedin.com/in/abdulmalik-memud-380550288/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
            <a href="mailto:memudabdulmalik11@gmail.com" className="text-gray-400 hover:text-white transition-colors"><Mail size={24} /></a>
          </div>

          <a
            href="https://github.com/ayomidemalik"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            More Projects <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-8 py-24 sm:py-32 z-10">
        <div className="w-full max-w-4xl mx-auto">
          <div className="space-y-12 sm:space-y-16">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mindrax-title cursor-pointer animate-fade-in inline-block">
                MINDRAX
              </h1>
              <div className="font-display uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mt-6 text-balance animate-slogan-in opacity-0 flex justify-center flex-wrap gap-x-2 sm:gap-x-4 md:gap-x-6">
                {sloganWords.map((word, index) => {
                  const animationDuration = 8;
                  const timePerWord = animationDuration / sloganWords.length;
                  const animationDelay = index * timePerWord;
                  const colorClass = sloganColors[index % sloganColors.length];

                  return (
                    <span
                      key={index}
                      className={`slogan-word ${colorClass}`}
                      style={{ animationDelay: `${animationDelay}s` }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
              <p className="mt-4 text-base sm:text-lg md:text-xl text-balance animate-slogan-in opacity-0 [animation-delay:0.7s]">
                An AI-Powered Content Idea Generator.
              </p>
            </div>

            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in">
              <div className="space-y-6">
                <div>
                  <label htmlFor="niche" className="block text-sm font-medium mb-2">1. Enter Your Niche</label>
                  <input
                    type="text"
                    id="niche"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="e.g., Sustainable Living, AI Startups..."
                    className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all placeholder:text-gray-500"
                    onKeyPress={(e) => e.key === 'Enter' && generateIdeas()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">2. Choose Content Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
                    {contentTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setContentType(type.id)}
                        className={`content-type-button ${contentType === type.id ? 'selected' : ''}`}
                      >
                        <div className="text-2xl sm:text-3xl">{type.icon}</div>
                        <div className="text-xs sm:text-sm font-medium">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <button onClick={generateIdeas} disabled={isLoading || !niche.trim()} className="glossy-button w-full font-semibold py-3 px-6 rounded-lg flex items-center justify-center text-base">
                    {isLoading ? <><Loader2 className="w-5 h-5 animate-spin mr-2" />Generating...</> : <><Sparkles className="w-5 h-5 mr-2" />Generate Ideas</>}
                  </button>
                </div>
                {error && <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">{error}</div>}
              </div>
            </div>

            {ideas && (
              <div ref={resultsRef} className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    Generated Ideas for <span className="text-purple-400">{niche}</span>
                  </h2>
                  <button onClick={copyToClipboard} className="flex items-center text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 bg-gray-800/60 rounded-lg border border-gray-700">
                    {copied ? <><Check className="w-4 h-4 mr-1.5 text-green-400" />Copied!</> : <><Copy className="w-4 h-4 mr-1.5" />Copy All</>}
                  </button>
                </div>
                <div className="prose prose-invert max-w-none prose-sm sm:prose-base">
                  <div className="whitespace-pre-wrap bg-black/30 p-4 rounded-lg font-mono text-gray-300">
                    {ideas.split('\n').map((line, index) => {
                       if (/^\d+\./.test(line.trim())) return <div key={index} className="mb-4 mt-2 font-semibold text-purple-400"><BoldText text={line} /></div>
                       else if (/^(Title|Description|Key Points|Target Audience|Tweet|Hashtags|Best time|Concept|Visuals|Audio|Caption|Topic|Slides|Outline|CTA|Hook|Body):/.test(line.trim())) return <div key={index} className="mt-3 mb-1 font-semibold text-gray-100"><BoldText text={line} /></div>
                       else if (line.trim() === '---') return <hr key={index} className="my-6 border-gray-700" />
                       else return <div key={index} className="mb-1 ml-1 sm:ml-4"><BoldText text={line} /></div>
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full text-center p-4 text-gray-500 text-sm z-10">
        <p>&copy; {new Date().getFullYear()} Mindrax | By Abdulmalik Memud</p>
      </footer>
    </div>
  )
}