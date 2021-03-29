declare module 'hcl-to-json' {
    export default <T extends Record<string, unknown>>(content: string) => T
}