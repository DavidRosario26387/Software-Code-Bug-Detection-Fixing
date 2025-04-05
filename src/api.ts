import fetch from 'node-fetch';
import { getApiKey, promptAndStoreApiKey } from './secret';

export async function queryHuggingFace(prompt: string): Promise<any> {
  const apiUrl = "https://api-inference.huggingface.co/v1/chat/completions";
  const model = "mistralai/Mistral-7B-Instruct-v0.3";
  let HF_API_KEY = await getApiKey();
  // 🔁 Prompt if not found
  if (!HF_API_KEY) {
    HF_API_KEY = await promptAndStoreApiKey();
    if (!HF_API_KEY) {
      console.error("No Hugging Face Access Token set.");
      return {
        bug_status: 'Error: No Access Token',
        bug_type: null,
        fixed_code: null
      };
    }
  }

  const body = {
    model,
    messages: [
      {
        role: "system",
        content: `You are a highly accurate code bug detection and fixing assistant.
Analyze the given Python code for the following types of errors:
- Syntax Errors
- Semantic Errors
- Logical Errors
- Runtime Errors
- Type Errors
- Name Errors
- Index Errors
- Off-by-One Errors
- Infinite Loops
- Indentation Errors
- any other incorrect logic 

Your response should ONLY be a JSON object with exactly **three** elements:
{
  "bug_status": "Buggy" or "Not Buggy",
  "bug_type": "Type of bug (e.g., Syntax Error, Logical Error, etc.)" or null,
  "fixed_code": "Corrected code full code" or null
}

If the code has no errors, set "bug_type" and "fixed_code" to **null**.
Do not include any explanations, comments, or extra text.`
      },
      {
        role: "user",
        content: `Code:\n${prompt}`
      }
    ]
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content ?? '{}';
    const match = content.slice(content.indexOf('{'), content.lastIndexOf('}') + 1);
    return JSON.parse(match);
  } catch (err) {
    console.error("API Error:", err);
    return {
      bug_status: 'Error',
      bug_type: null,
      fixed_code: null
    };
  }
}
