export interface VirtualScrollConfig {
  estimateSize: (index: number) => number;
  overscan?: number;
}
