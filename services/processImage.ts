'use server'

import { OpenAI } from 'openai';

const client = new OpenAI();

export async function processImage(base64String: string, mimeType: string): Promise<{ title: string; keywords: string }> {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Respond with valid JSON only, in this format: {\"title\": \"short title here\", \"keywords\": \"comma separated keywords here\"}\n\nAnalyze this image and provide:\n1. A short, descriptive title (max 6 words)\n2. Keywords describing the main elements (max 20 words)",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64String}`
              },
            },
          ],
        }
      ],
    });

    console.log('response.choices[0]', response.choices[0]);

    const content = response.choices[0]?.message?.content || '{"title": "", "keywords": ""}';
    return JSON.parse(content);
  } catch (error) {
    console.error('Error getting image description:', error);
    return { title: '', keywords: '' };
  }
} 