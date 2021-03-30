import fs from 'fs'
import hclParse from 'hcl-to-json'

export function parse (contents: Buffer | string): NodeJS.ProcessEnv {
  const container: NodeJS.ProcessEnv = {}

  contents = typeof contents === 'string' ? contents : contents.toString('utf-8')

  let parsed: Record<string, unknown>
  if (contents.startsWith('{')) {
    parsed = JSON.parse(contents)
  } else {
    parsed = hclParse(contents)
  }

  Object.entries(parsed).forEach(([key, value]) => {
    container[key] = typeof value === 'string' ? value : JSON.stringify(value)
  })

  return container
}

export function from (path: string): void {
  const buffer = fs.readFileSync(path)
  const container: NodeJS.ProcessEnv = parse(buffer)
  process.env = {
    ...container, // Overwrite .tfvars files with existing contents in process.env
    ...process.env
  }
}
