import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Clock3, ExternalLink, LoaderCircle, RotateCcw, Search, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeEvidence } from "@/lib/news-analysis.functions";
import { predictRandomForest } from "@/lib/random-forest";

type Verdict = "LIKELY GENUINE NEWS" | "LIKELY FAKE NEWS";
type Analysis = { verdict: Verdict; confidence: number; reason: string; findings: Array<{claim:string;assessment:string}>; sources: Array<{title:string;url:string;source:string;publishedAt:string}>; analysisMs:number; mlProbability:number; preview:string };
type HistoryItem = Pick<Analysis,"verdict"|"confidence"|"preview"> & { timestamp:string };
const key = "fake-news-detection-history-v1";

export function Analyzer({ compact = false }: { compact?: boolean }) {
  const runEvidence = useServerFn(analyzeEvidence);
  const [article,setArticle] = useState(""); const [loading,setLoading] = useState(false); const [error,setError] = useState(""); const [result,setResult] = useState<Analysis>(); const [history,setHistory] = useState<HistoryItem[]>([]);
  useEffect(() => { try { setHistory(JSON.parse(localStorage.getItem(key) ?? "[]")); } catch { setHistory([]); } }, []);
  const analyze = async () => {
    const text=article.trim(); if(text.length<120){setError("Please paste a fuller article of at least 120 characters.");return;} if(text.length>20000){setError("Please keep the article under 20,000 characters.");return;}
    setError(""); setLoading(true); setResult(undefined);
    try { let mlProbability=0.5; try { mlProbability=(await predictRandomForest(text)).probability; } catch { mlProbability=0.5; } const ml={probability:mlProbability}; const evidence=await runEvidence({data:{article:text,mlProbability:ml.probability}}); const next={...evidence,mlProbability:ml.probability,preview:text.slice(0,220)}; setResult(next); const item={verdict:next.verdict,confidence:next.confidence,preview:next.preview,timestamp:new Date().toISOString()}; const updated=[item,...history].slice(0,8); setHistory(updated); localStorage.setItem(key,JSON.stringify(updated)); }
    catch(e){setError(e instanceof Error?e.message:"This article could not be checked right now.");} finally{setLoading(false);}
  };
  const clear=()=>{setArticle("");setResult(undefined);setError("");};
  return <div className="space-y-10">
    <section className={compact ? "" : "border-t border-border pt-10"}>
      <div className="mb-5 flex items-end justify-between gap-4"><div><p className="mb-2 text-xs font-bold uppercase text-primary">Article analyzer</p><h2 className="font-display text-3xl font-bold sm:text-4xl">Check a news article</h2></div><span className="text-sm tabular-nums text-muted-foreground">{article.length.toLocaleString()} / 20,000</span></div>
      <Textarea value={article} onChange={(e)=>{setArticle(e.target.value);if(error)setError("");}} maxLength={20000} placeholder="Paste the full news article here..." className="min-h-64 resize-y rounded-none border-border bg-card p-5 text-base leading-7 shadow-none focus-visible:ring-primary" aria-label="News article"/>
      {error && <p className="mt-3 text-sm font-medium text-destructive" role="alert">{error}</p>}
      <div className="mt-4 flex flex-wrap gap-3"><Button size="lg" onClick={analyze} disabled={loading} className="rounded-none px-7">{loading?<><LoaderCircle className="animate-spin"/>Checking this article...</>:<><Search/>CHECK NEWS</>}</Button><Button size="lg" variant="outline" onClick={clear} disabled={loading||(!article&&!result)} className="rounded-none"><RotateCcw/>Clear</Button></div>
    </section>
    {result && <section className="border-y border-border py-8" aria-live="polite">
      <div className="grid gap-8 lg:grid-cols-[1fr_18rem]"><div><div className="mb-5 flex items-start gap-4">{result.verdict==="LIKELY GENUINE NEWS"?<CheckCircle2 className="mt-1 size-8 text-success"/>:<ShieldAlert className="mt-1 size-8 text-warning"/>}<div><p className="text-xs font-bold uppercase text-muted-foreground">Verdict</p><h2 className="mt-1 font-display text-3xl font-bold">{result.verdict}</h2>{result.confidence!==null&&<p className="mt-2 text-lg font-semibold">{result.confidence}% confidence</p>}</div></div><h3 className="font-bold">Why this result was reached</h3><p className="mt-2 leading-7 text-muted-foreground">{result.reason}</p>{result.findings.length>0&&<div className="mt-6 space-y-4">{result.findings.map((f,i)=><div key={i} className="border-l-2 border-primary pl-4"><p className="font-semibold">{f.claim}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{f.assessment}</p></div>)}</div>}</div>
      <aside className="border-l-0 border-border lg:border-l lg:pl-7"><p className="text-xs font-bold uppercase text-muted-foreground">ML model signal</p><p className="mt-2 text-2xl font-bold">{Math.round(result.mlProbability*100)}% genuine</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Supporting evidence from the notebook-trained Random Forest. Current-source evidence carries more weight.</p><div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><Clock3 size={16}/>{(result.analysisMs/1000).toFixed(1)} seconds</div></aside></div>
      {result.sources.length>0&&<div className="mt-8 border-t border-border pt-7"><h3 className="font-bold">Supporting or contradicting sources</h3><div className="mt-4 grid gap-3 sm:grid-cols-2">{result.sources.map((s)=><a key={s.title} href={s.url} target="_blank" rel="noreferrer" className="group border border-border p-4 transition-colors hover:border-primary"><span className="text-xs font-bold uppercase text-primary">{s.source}</span><p className="mt-2 text-sm font-semibold leading-5 group-hover:underline">{s.title}</p><span className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">View source <ExternalLink size={12}/></span></a>)}</div></div>}
      <div className="mt-8 bg-secondary p-5"><p className="text-xs font-bold uppercase text-muted-foreground">Article preview</p><p className="mt-2 text-sm leading-6">{result.preview}{article.length>220?"…":""}</p></div>
    </section>}
    {history.length>0&&<section><div className="flex items-center justify-between"><h2 className="font-display text-2xl font-bold">Recent Analyses</h2><Button variant="ghost" size="sm" onClick={()=>{localStorage.removeItem(key);setHistory([]);}}><Trash2/>Clear History</Button></div><div className="mt-5 divide-y divide-border border-y border-border">{history.map((item,i)=><div key={`${item.timestamp}-${i}`} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="line-clamp-1 text-sm">{item.preview}</p><p className="mt-1 text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleString()}</p></div><p className="text-xs font-bold">{item.verdict}{item.confidence!==null?` · ${item.confidence}%`:""}</p></div>)}</div></section>}
  </div>;
}
