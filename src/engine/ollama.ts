import axios from 'axios';
import { ChatCompletionRequestMessage } from 'openai';
import { AiEngine } from './Engine';

export class OllamaAi implements AiEngine {

  constructor(private model: string = 'mistral', private basePath: string = 'http://localhost:11434') {
  }


  async generateCommitMessage(
    messages: Array<ChatCompletionRequestMessage>
  ): Promise<string | undefined> {


    let prompt = messages.map((x) => x.content).join('\n');
    //hoftix: local models are not so clever so im changing the prompt a bit...
    prompt += 'Summarize above git diff in 10 words or less';
    const url = `${this.basePath}/api/generate`;
    const p = {
      model: this.model,
      prompt,
      stream: false
    };
    try {
      const response = await axios.post(url, p, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data?.response;
    } catch (err: any) {
      const message = err.response?.data?.error ?? err.message;
      throw new Error('local model issues. details: ' + message);
    }
  }

  static async validateBaseUrl(baseUrl: string): Promise<boolean> {
    baseUrl = baseUrl.trim().replace(/\/$/, '')
    const url = `${baseUrl}/api/tags`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.status===200;

    } catch (err: any) {
      const message = err.response?.data?.error ?? err.message;
      console.error('Failed to connect to api: ' + err)
      throw new Error('Failed to connect to api: ' + message);
    }
  }

  static async validateModel(model: string, baseUrl: string = 'http://localhost:11434'): Promise<boolean> {
    const url = `${baseUrl}/api/show`;
    const p = {
      name: model
    };
    try {
      const response = await axios.post(url, p, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.status===200;
    } catch (err: any) {
      const message = err.response?.data?.error ?? err.message;
      throw new Error('local model issues. details: ' + message);
    }
  }


}

export const ollamaAi = new OllamaAi();
