declare function ParseFn <T extends Record<string, unknown>> (content: string): T

declare module 'hcl-to-json' {
  export default ParseFn
}
