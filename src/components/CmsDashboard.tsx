import React, { useState, useEffect } from 'react';
// Firebase logic removed
import './CmsDashboard.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  altText: string;
  excerpt: string;
  content: string;
  status: 'Published' | 'Draft';
  createdAt: any;
  updatedAt: any;
  seoTitle: string;
  metaDesc: string;
  showToc: boolean;
  showFaq: boolean;
  showAuthor: boolean;
  showRelated: boolean;
  showCta: boolean;
}

export default function CmsDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('editor');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activePostIndex, setActivePostIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    category: 'Beginner Trading Guide',
    author: 'Chris Ani — Founder, ValoAi',
    readTime: '5 min read',
    image: '',
    altText: '',
    excerpt: '',
    content: '',
    status: 'Draft',
    seoTitle: '',
    metaDesc: '',
    showToc: true,
    showFaq: true,
    showAuthor: true,
    showRelated: true,
    showCta: true,
  });

  useEffect(() => {
    // Auth guard temporarily disabled for local testing
    // if (!authLoading && !isAdmin) {
    //   navigate('/dashboard');
    // }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    // Mocking posts
    setPosts([]);
    setLoading(false);
  }, []);

  const handlePostSelect = (index: number) => {
    setActivePostIndex(index);
    setFormData(posts[index]);
    setActiveSection('editor');
  };

  const handleNewPost = () => {
    setActivePostIndex(null);
    setFormData({
      title: 'New Post',
      slug: '/blog/new-post',
      category: 'Beginner Trading Guide',
      author: 'Chris Ani — Founder, ValoAi',
      readTime: '5 min read',
      image: '',
      altText: '',
      excerpt: '',
      content: '<h2>1. Introduction</h2><p>Start writing here...</p>',
      status: 'Draft',
      seoTitle: '',
      metaDesc: '',
      showToc: true,
      showFaq: true,
      showAuthor: true,
      showRelated: true,
      showCta: true,
    });
    setActiveSection('editor');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const insertHtml = (tag: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content || '';
    let inserted = '';
    
    switch (tag) {
      case 'H2': inserted = `<h2>${text.substring(start, end) || 'Heading'}</h2>`; break;
      case 'B': inserted = `<b>${text.substring(start, end) || 'Bold text'}</b>`; break;
      case 'I': inserted = `<i>${text.substring(start, end) || 'Italic text'}</i>`; break;
      case 'Link': inserted = `<a href="https://example.com">${text.substring(start, end) || 'Link text'}</a>`; break;
      case 'Quote': inserted = `<blockquote>${text.substring(start, end) || 'Quote'}</blockquote>`; break;
      case 'List': inserted = `<ul>\n  <li>${text.substring(start, end) || 'List item'}</li>\n</ul>`; break;
      case 'Image': inserted = `<img src="/images/ai_trading.png" alt="Alt text" />`; break;
      case 'CTA': inserted = `<div class="bg-slate-900 border border-slate-800 p-8 rounded-3xl my-10 shadow-xl overflow-hidden relative"><h4 class="text-xl font-black text-white mt-0 mb-4 tracking-tight">Want Structured Trade Signals?</h4><a href="/signup" class="inline-block bg-white text-slate-900 px-6 py-3 rounded-lg font-black text-sm hover:bg-slate-50 transition-colors no-underline">Start Free Trial</a></div>`; break;
    }
    
    const newContent = text.substring(0, start) + inserted + text.substring(end);
    setFormData({ ...formData, content: newContent });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + inserted.length, start + inserted.length);
    }, 0);
  };

  const savePost = async () => {
    try {
      alert('Post saved successfully!');
    } catch (error) {
      console.error("Error saving post:", error);
      alert('Failed to save post. Check console.');
    }
  };

  if (authLoading) return <div className="cms-root flex items-center justify-center min-h-screen text-white">Loading...</div>;

  return (
    <div className="cms-root">
      <header className="cms-topbar">
        <div className="cms-logo">
          <div className="cms-vmark">V</div>ValoAi <span className="cms-badge">CMS</span>
        </div>
        <input className="cms-search" placeholder="Search Studio, posts, authors, signals..." />
        <div className="cms-user">
          <span className="cms-small">Vision Workspace</span>
          <div className="cms-avatar">CA</div>
          <div><b>Chris Ani</b><br/><span className="cms-small">Administrator</span></div>
        </div>
      </header>

      <div className="cms-layout">
        <aside className="cms-sidebar">
          <div className="cms-menu-title">Content</div>
          <div className={`cms-nav ${activeSection === 'editor' ? 'active' : ''}`} onClick={() => setActiveSection('editor')}><span>📝</span>Blog Posts</div>
          <div className={`cms-nav ${activeSection === 'authors' ? 'active' : ''}`} onClick={() => setActiveSection('authors')}><span>👤</span>Authors</div>
          <div className={`cms-nav ${activeSection === 'categories' ? 'active' : ''}`} onClick={() => setActiveSection('categories')}><span>📚</span>Categories</div>
          <div className={`cms-nav ${activeSection === 'faqs' ? 'active' : ''}`} onClick={() => setActiveSection('faqs')}><span>❓</span>FAQs</div>
          <div className={`cms-nav ${activeSection === 'signals' ? 'active' : ''}`} onClick={() => setActiveSection('signals')}><span>📈</span>Signal Reports</div>
          <div className={`cms-nav ${activeSection === 'pages' ? 'active' : ''}`} onClick={() => setActiveSection('pages')}><span>🏠</span>Homepage</div>
          <div className={`cms-nav ${activeSection === 'preview' ? 'active' : ''}`} onClick={() => setActiveSection('preview')}><span>👁️</span>Live Preview</div>
          <div className="cms-menu-title">System</div>
          <div className="cms-nav"><span>👥</span>Users</div>
          <div className="cms-nav"><span>🔐</span>Roles</div>
          <div className="cms-nav"><span>⚙️</span>Settings</div>
        </aside>

        <section className="cms-postlist">
          <div className="cms-section-head"><h3>Blog Posts</h3><span className="cms-small">All posts</span></div>
          <button className="cms-btn" style={{ width: '100%', marginBottom: '14px' }} onClick={handleNewPost}>+ New Post</button>

          {loading ? (
            <div className="text-slate-400 text-sm py-4">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-slate-500 text-sm py-4">No posts found. Create one!</div>
          ) : (
            posts.map((post, i) => (
              <div key={post.id} className={`cms-post ${activePostIndex === i ? 'active' : ''}`} onClick={() => handlePostSelect(i)}>
                <div className={`cms-thumb ${post.image ? 'has-image' : ''}`} style={{ backgroundImage: post.image ? `url(${post.image})` : undefined }}></div>
                <div>
                  <h4>{post.title}</h4>
                  <div className="cms-meta">{post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : 'New'} • {post.readTime}</div>
                  <div className="cms-status" style={{ color: post.status === 'Draft' ? '#60a5fa' : '#22c55e' }}>● {post.status}</div>
                </div>
              </div>
            ))
          )}
        </section>

        <main className="cms-main">
          {activeSection === 'editor' && (
            <div className="cms-section">
              <h2 id="editor-title">{formData.title || 'Select or create a post'}</h2>
              <div className="cms-tabs">
                <div className="cms-tab active">Editor</div>
                <div className="cms-tab">SEO</div>
                <div className="cms-tab">Social</div>
                <div className="cms-tab">Schema</div>
                <div className="cms-tab">Comments</div>
              </div>

              <label className="cms-label">Title</label>
              <input className="cms-input" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} />

              <div className="cms-row">
                <div><label className="cms-label">Slug</label><input className="cms-input" value={formData.slug || ''} onChange={(e) => setFormData({...formData, slug: e.target.value})} /></div>
                <div>
                  <label className="cms-label">Category</label>
                  <select className="cms-select" value={formData.category || ''} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option>Beginner Trading Guide</option>
                    <option>Trading Psychology</option>
                    <option>AI & Trading</option>
                  </select>
                </div>
              </div>

              <div className="cms-row">
                <div>
                  <label className="cms-label">Author</label>
                  <select className="cms-select" value={formData.author || ''} onChange={(e) => setFormData({...formData, author: e.target.value})}>
                    <option>Chris Ani — Founder, ValoAi</option>
                    <option>ValoAi Research</option>
                  </select>
                </div>
                <div><label className="cms-label">Reading Time</label><input className="cms-input" value={formData.readTime || ''} onChange={(e) => setFormData({...formData, readTime: e.target.value})} /></div>
              </div>

              <label className="cms-label">Featured Image URL or Upload</label>
              <div className="flex gap-2 mb-2">
                <input className="cms-input" style={{ marginBottom: 0 }} placeholder="/images/ai_trading.png" value={formData.image || ''} onChange={(e) => setFormData({...formData, image: e.target.value})} />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple hover:file:bg-purple-100 cursor-pointer" />
              </div>
              <div className="cms-featured" style={{ backgroundImage: formData.image ? `url(${formData.image})` : undefined }}>
                {!formData.image && <div className="cms-featured-card"><b>ValoAi trading desk image</b><br/><span className="cms-small">Laptop chart + phone signal + premium purple lighting</span></div>}
              </div>

              <label className="cms-label">Image Alt Text</label>
              <input className="cms-input" value={formData.altText || ''} onChange={(e) => setFormData({...formData, altText: e.target.value})} />

              <label className="cms-label">Excerpt</label>
              <textarea className="cms-textarea" value={formData.excerpt || ''} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} />

              <label className="cms-label">Content Editor (HTML)</label>
              <div className="cms-editorbar">
                <button className="cms-tool" onClick={() => insertHtml('H2')}>H2</button>
                <button className="cms-tool" onClick={() => insertHtml('B')}>B</button>
                <button className="cms-tool" onClick={() => insertHtml('I')}>I</button>
                <button className="cms-tool" onClick={() => insertHtml('Link')}>Link</button>
                <button className="cms-tool" onClick={() => insertHtml('Quote')}>Quote</button>
                <button className="cms-tool" onClick={() => insertHtml('List')}>List</button>
                <button className="cms-tool" onClick={() => insertHtml('Image')}>Image</button>
                <button className="cms-tool" onClick={() => insertHtml('CTA')}>CTA</button>
              </div>
              <textarea 
                id="content-editor"
                className="cms-articlebox" 
                style={{ width: '100%', resize: 'vertical' }}
                value={formData.content || ''}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
              />
            </div>
          )}

          {activeSection === 'authors' && (
            <div className="cms-section">
              <h2>Authors</h2>
              <div className="cms-panel">
                <h3>Chris Ani</h3>
                <div className="cms-row"><input className="cms-input" value="Chris Ani" readOnly/><input className="cms-input" value="Founder, ValoAi" readOnly/></div>
                <label className="cms-label">Bio</label>
                <textarea className="cms-textarea" readOnly value="Chris Ani is a crypto trader, educator, and founder of ValoAi. He helps traders use AI and structured systems to make smarter trading decisions." />
                <button className="cms-btn mt-2">Save Author</button>
              </div>
            </div>
          )}

          {activeSection === 'categories' && (
            <div className="cms-section">
              <h2>Categories</h2>
              <div className="cms-panel">Beginner Trading Guide — 12 posts</div>
              <div className="cms-panel">Trading Psychology — 8 posts</div>
              <div className="cms-panel">AI & Trading — 10 posts</div>
              <div className="cms-panel">Risk Management — 7 posts</div>
            </div>
          )}

          {activeSection === 'faqs' && (
            <div className="cms-section">
              <h2>FAQ Manager</h2>
              <div className="cms-panel"><b>Can AI predict the crypto market?</b><p className="cms-small">No. AI can help analyze data and structure decisions, but it cannot guarantee outcomes.</p></div>
              <div className="cms-panel"><b>What leverage should beginners use?</b><p className="cms-small">Beginners should generally use low leverage and prioritize capital protection.</p></div>
              <button className="cms-btn">+ Add FAQ</button>
            </div>
          )}

          {activeSection === 'signals' && (
            <div className="cms-section">
              <h2>Signal Reports</h2>
              <div className="cms-panel">
                <div className="cms-row"><input className="cms-input" value="BTC/USDT" readOnly /><select className="cms-select"><option>LONG</option><option>SHORT</option></select></div>
                <div className="cms-row"><input className="cms-input" value="$68,000 - $68,300" readOnly/><input className="cms-input" value="$66,900" readOnly/></div>
                <div className="cms-row"><input className="cms-input" value="TP1 Hit" readOnly/><input className="cms-input" value="Published" readOnly/></div>
                <button className="cms-btn mt-2">Publish Signal Report</button>
              </div>
            </div>
          )}

          {activeSection === 'pages' && (
            <div className="cms-section">
              <h2>Homepage Editor</h2>
              <label className="cms-label">Hero Headline</label><input className="cms-input" value="Trade Smarter. Win Faster." readOnly />
              <label className="cms-label">Hero Subheadline</label><textarea className="cms-textarea" readOnly value="AI-powered crypto trading signals and market insights delivered with structure." />
              <label className="cms-label">Featured Blog Post</label>
              <select className="cms-select"><option>Why Most Beginner Traders Lose Money in Futures</option></select>
              <button className="cms-btn mt-4">Save Homepage</button>
            </div>
          )}

          {activeSection === 'preview' && (
            <div className="cms-section">
              <div className="cms-preview">
                <div style={{ color: '#7c3aed', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase' }}>{formData.category}</div>
                <h1>{formData.title}</h1>
                <p>{formData.excerpt}</p>
                <div className="cms-preview-meta"><span>By {formData.author}</span><span>{formData.readTime}</span></div>
                <div className="cms-preview-img" style={{ backgroundImage: formData.image ? `url(${formData.image})` : undefined }}></div>
                <div dangerouslySetInnerHTML={{ __html: formData.content || '' }} />
              </div>
            </div>
          )}
        </main>

        <aside className="cms-right">
          <div className="cms-panel">
            <h3>Publish</h3>
            <div className="cms-pill">● {formData.status || 'Draft'}</div>
            <label className="cms-label">Status</label>
            <select className="cms-select mb-4" value={formData.status || 'Draft'} onChange={(e) => setFormData({...formData, status: e.target.value as 'Published' | 'Draft'})}>
              <option>Published</option>
              <option>Draft</option>
            </select>
            <button className="cms-btn" style={{ width: '100%' }} onClick={savePost}>Save / Update</button>
            <button className="cms-btn secondary" style={{ width: '100%', marginTop: '8px' }} onClick={() => setFormData({...formData, status: 'Draft'})}>Set as Draft</button>
          </div>

          <div className="cms-panel">
            <h3>SEO</h3>
            <label className="cms-label">SEO Title</label>
            <input className="cms-input" value={formData.seoTitle || ''} onChange={(e) => setFormData({...formData, seoTitle: e.target.value})} />
            <label className="cms-label">Meta Description</label>
            <textarea className="cms-textarea" value={formData.metaDesc || ''} onChange={(e) => setFormData({...formData, metaDesc: e.target.value})} />
            <label className="cms-label">Canonical URL</label>
            <input className="cms-input" value={`https://valoai.app${formData.slug}`} readOnly />
          </div>

          <div className="cms-panel">
            <h3>Options</h3>
            <div className="cms-check"><input type="checkbox" checked={formData.showToc !== false} onChange={(e) => setFormData({...formData, showToc: e.target.checked})} /> Show Table of Contents</div>
            <div className="cms-check"><input type="checkbox" checked={formData.showFaq !== false} onChange={(e) => setFormData({...formData, showFaq: e.target.checked})} /> Show FAQ Section</div>
            <div className="cms-check"><input type="checkbox" checked={formData.showAuthor !== false} onChange={(e) => setFormData({...formData, showAuthor: e.target.checked})} /> Show Author Box</div>
            <div className="cms-check"><input type="checkbox" checked={formData.showRelated !== false} onChange={(e) => setFormData({...formData, showRelated: e.target.checked})} /> Show Related Articles</div>
            <div className="cms-check"><input type="checkbox" checked={formData.showCta !== false} onChange={(e) => setFormData({...formData, showCta: e.target.checked})} /> Show CTA Block</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
