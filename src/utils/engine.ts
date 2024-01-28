import { AiEngine } from '../engine/Engine';
import { api } from '../engine/openAi';
import { getConfig } from '../commands/config';
import { OllamaAi } from '../engine/ollama';

export function getEngine(): AiEngine {
  const config = getConfig();
  if (config?.OCO_AI_PROVIDER == 'ollama') {
    return new OllamaAi(
      config?.OCO_OLLAMA_MODEL || 'mistral',
      config?.OCO_OLLAMA_BASE_PATH || 'http://localhost:11434'
    );
  }
  //open ai gpt by default
  return api;
}
