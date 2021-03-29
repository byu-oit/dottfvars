import fs from 'fs'
import hclParse from 'hcl-to-json'

export async function parse (contents: Buffer | string): Promise<NodeJS.ProcessEnv> {
  const container: NodeJS.ProcessEnv = {}

  contents = typeof contents === 'string' ? contents : contents.toString('utf-8')

  let parsed: Record<string, unknown>
  if (contents.startsWith('{')) {
    parsed = JSON.parse(contents)
  } else {
    parsed = await hclParse(contents)
  }

  Object.entries(parsed).forEach(([key, value]) => {
    container[key] = typeof value === 'string' ? value : JSON.stringify(value)
  })

  return container
}

export async function from (path: string): Promise<void> {
  const buffer = fs.readFileSync(path)
  const container: NodeJS.ProcessEnv = await parse(buffer)
  process.env = {
    ...process.env,
    ...container
  }
}
