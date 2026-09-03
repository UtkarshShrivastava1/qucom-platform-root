import { JwtTokenPayload } from '@repo/shared-types';

declare module 'mongo-sanitize' {
  export default function sanitize<T>(target: T): T;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtTokenPayload & { id?: string };
      correlationId?: string;
    }
  }
}

export {};
