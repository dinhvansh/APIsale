import {
  buildStudioPayload,
  initialValues,
  type LiveAction,
  type StudioCategory,
} from '@/features/playground-preview/live-catalog'

export const API_ORIGIN = 'https://api.beeskybase.com'
export function documentationPayload(
  action: LiveAction,
  category: StudioCategory
) {
  const values = initialValues(action)
  for (const field of action.fields) {
    if (values[field.key]) continue
    if (field.kind === 'song') {
      values[field.key] = JSON.stringify(['YOUR_TASK_ID', 'YOUR_TRACK_ID'])
    } else if (field.kind === 'url' || field.kind === 'urls') {
      const extension = field.key.toLowerCase().includes('audio')
        ? 'mp3'
        : 'jpg'
      values[field.key] = `https://example.com/your-file.${extension}`
    } else if (field.kind === 'number') {
      values[field.key] = String(field.min ?? 1)
    } else if (field.options) {
      values[field.key] = field.options[0]
    } else if (field.key === 'title') {
      values[field.key] = 'Morning by the lake'
    } else if (field.key === 'style') {
      values[field.key] = 'Acoustic piano, warm guitar'
    } else if (field.required || field.key === 'prompt') {
      values[field.key] =
        category === 'chat'
          ? 'Write three ideas for a lakeside homestay.'
          : 'A quiet lakeside cabin at sunrise, warm light, peaceful atmosphere'
    }
  }
  return buildStudioPayload(action, category, values)
}
export function documentationExamples(
  payload: Record<string, unknown>,
  chat: boolean
) {
  const endpoint = chat ? '/v1/chat/completions' : '/v1/media/tasks'
  const body = JSON.stringify(payload, null, 2)
  return {
    curl: `curl "${API_ORIGIN}${endpoint}" \\
  -H "Authorization: Bearer $BEESKYBASE_API_KEY" \\
  -H "Content-Type: application/json" \\
  --data '${body}'`,
    javascript: `const response = await fetch("${API_ORIGIN}${endpoint}", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.BEESKYBASE_API_KEY}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(${body}),
});
if (!response.ok) throw new Error(\`Request failed: \${response.status}\`);
const result = await response.json();
console.log(${chat ? 'result.choices[0].message.content' : 'result.task_id'});`,
    python: `import os
import json
import requests

payload = json.loads(${JSON.stringify(body)})
response = requests.post(
    "${API_ORIGIN}${endpoint}",
    headers={"Authorization": "Bearer " + os.environ["BEESKYBASE_API_KEY"]},
    json=payload,
    timeout=180,
)
response.raise_for_status()
result = response.json()
print(${chat ? 'result["choices"][0]["message"]["content"]' : 'result["task_id"]'})`,
  }
}
