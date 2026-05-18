export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  items: T[];
  cursor?: string;
  hasMore: boolean;
}

export interface HealthResponse {
  status: string;
  network: string;
  latestLedger: number;
  rpcLatencyMs: number;
  timestamp: string;
}

export interface EventsResponse {
  events: any[];
  cursor?: string;
}
