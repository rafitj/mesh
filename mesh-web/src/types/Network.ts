export interface NetworkNode {
  id: string;
  label: string;
  svg: string;
}
export interface NetworkLink {
  source: string;
  target: string;
}
export interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}
