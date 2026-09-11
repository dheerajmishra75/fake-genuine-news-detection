type Tree = { l: number[]; r: number[]; f: number[]; t: number[]; v: number[][] };
type Model = { vocabulary: Record<string, number>; idf: number[]; trees: Tree[]; metrics: { testAccuracy: number; trainRows: number; testRows: number; fakeRows: number; trueRows: number } };
let modelPromise: Promise<Model> | undefined;

export function wordopt(text: string) {
  return text.toLowerCase().replace(/\[.*?\]/g, "").replace(/\W/g, " ").replace(/https?:\/\/\S+/g, "").replace(/<.*?>+/g, "").replace(/\n/g, "").replace(/\w*\d\w*/g, "");
}

async function loadModel() {
  if (!modelPromise) modelPromise = fetch("/models/random-forest-v1.json.gz").then(async (response) => {
    if (!response.ok || !response.body) throw new Error("The ML model could not be loaded.");
    const stream = response.body.pipeThrough(new DecompressionStream("gzip"));
    return JSON.parse(await new Response(stream).text()) as Model;
  });
  return modelPromise;
}

export async function predictRandomForest(text: string) {
  const model = await loadModel();
  const terms = wordopt(text).match(/\b\w\w+\b/g) ?? [];
  const counts = new Map<number, number>();
  for (const term of terms) { const index = model.vocabulary[term]; if (index !== undefined) counts.set(index, (counts.get(index) ?? 0) + 1); }
  const weights = new Map<number, number>();
  let norm = 0;
  for (const [index, count] of counts) { const weight = count * model.idf[index]; weights.set(index, weight); norm += weight * weight; }
  norm = Math.sqrt(norm) || 1;
  for (const [index, weight] of weights) weights.set(index, weight / norm);
  let genuineVotes = 0;
  for (const tree of model.trees) {
    let node = 0;
    while (tree.l[node] !== -1) node = (weights.get(tree.f[node]) ?? 0) <= tree.t[node] ? tree.l[node] : tree.r[node];
    const values = tree.v[node];
    if ((values[1] ?? 0) > (values[0] ?? 0)) genuineVotes += 1;
  }
  return { probability: genuineVotes / model.trees.length, metrics: model.metrics };
}
