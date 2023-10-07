import { AiEngine } from '../engine/Engine';
import { api } from '../engine/openAi';
import { getConfig } from '../commands/config';
import { hugging } from '../engine/huggingFace';

export function getEngine(): AiEngine {
  const config = getConfig();
  if (config?.OCO_HUGGING_FACE_API_KEY) {
    return hugging;
  }
  if (config?.OCO_OPENAI_API_KEY) {
    return api;
  }
  throw new Error('No api key found');
}
