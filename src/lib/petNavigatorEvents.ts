export type PetNavigatorMatchSource = 'local_rule' | 'llm' | 'page_agent' | 'fallback';

export interface PetNavigatorUsage {
  prompt_tokens?: number;
  completion_tokens?: number;
  total_tokens?: number;
}

export interface PetNavigatorEventPayload {
  input: string;
  matchedBy: PetNavigatorMatchSource;
  action: unknown;
  success: boolean;
  latencyMs: number;
  tokenUsage?: PetNavigatorUsage;
}

export function logPetNavigatorEvent(payload: PetNavigatorEventPayload) {
  console.debug('[PetNavigator]', payload);
}
