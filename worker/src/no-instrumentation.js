// capjs-core loads esbuild and javascript-obfuscator only to build its optional
// "instrumentation" script, which this Worker doesn't use. wrangler.toml points
// both imports here so they aren't bundled into the Worker.
export default {};
