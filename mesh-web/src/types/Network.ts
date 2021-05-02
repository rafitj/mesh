export interface NetworkNode {
  id: string;
  label: string;
  svg: string;
}
export interface NetworkLink {
  source: string;
  target: string;
  latency: number;
  id: number;
}
export interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}
