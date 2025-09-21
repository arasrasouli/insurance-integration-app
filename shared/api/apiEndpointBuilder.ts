export interface EndpointBuilder {
  buildEndpoint(path: string, id?: number): string
}

export class DefaultEndpointBuilder implements EndpointBuilder {
  constructor(private readonly segmentString: string) {}

  buildEndpoint(path: string, id?: number): string {
    const segments = ['/api', this.segmentString]
    if (path) segments.push(path)
    if (id) segments.push(id.toString())
    return segments.join('/')
  }
}