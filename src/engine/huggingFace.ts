
import { HfInference } from '@huggingface/inference';
import { getConfig } from '../commands/config';
import { ChatCompletionRequestMessage } from 'openai';

export class HuggingFaceApi {
  async generateCommitMessage(
    messages: Array<ChatCompletionRequestMessage>
  ): Promise<string | undefined> {
    const config = getConfig();
    const inference = new HfInference(config?.OCO_HUGGING_FACE_API_KEY);

    const gpt2 = inference.endpoint(
      'https://xyz.eu-west-1.aws.endpoints.huggingface.cloud/gpt2'
    );
    console.log('messages', messages);
    const { generated_text } = await gpt2.textGeneration({
      inputs: messages.map(x => x.content).join('')
    });
    return generated_text;
  }
}

export const hugging = new HuggingFaceApi();
