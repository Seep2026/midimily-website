const evidenceEditorialNotes = Object.freeze({
  'enterprise-ai-workflow-pilot': '真正重要的不是模型多强，而是第一个闭环是否跑得通。',
});

export function getEvidenceEditorialNote(slug) {
  return evidenceEditorialNotes[slug] ?? null;
}
