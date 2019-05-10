export class ConsoleMock {
  _init() {
    this.calls = []
    this.original = console.error
    console.error = (...args) => {
      this.calls.push(args)
    }
  }
  _destroy() {
    console.error = this.original
  }
}