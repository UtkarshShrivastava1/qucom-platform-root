import { EventEmitter } from 'node:events';
import { EventName, EventPayloadMap } from './eventTypes.js';
import { logger } from '../utils/logger.js';

export interface IEventBus {
  emit<E extends EventName>(event: E, payload: EventPayloadMap[E]): boolean;
  on<E extends EventName>(event: E, listener: (payload: EventPayloadMap[E]) => void | Promise<void>): this;
  off<E extends EventName>(event: E, listener: (payload: EventPayloadMap[E]) => void | Promise<void>): this;
}

class TypedEventBus implements IEventBus {
  private emitter = new EventEmitter();

  constructor() {
    this.emitter.setMaxListeners(50);
  }

  emit<E extends EventName>(event: E, payload: EventPayloadMap[E]): boolean {
    logger.info(`[EventBus] Emitting event: ${event} -> ${JSON.stringify(payload)}`);
    return this.emitter.emit(event, payload);
  }

  on<E extends EventName>(
    event: E,
    listener: (payload: EventPayloadMap[E]) => void | Promise<void>
  ): this {
    this.emitter.on(event, async (payload: EventPayloadMap[E]) => {
      try {
        await listener(payload);
      } catch (error) {
        logger.error(`[EventBus] Error handling event ${event}: ${error instanceof Error ? error.message : String(error)}`);
      }
    });
    return this;
  }

  off<E extends EventName>(
    event: E,
    listener: (payload: EventPayloadMap[E]) => void | Promise<void>
  ): this {
    this.emitter.off(event, listener as (...args: unknown[]) => void);
    return this;
  }
}

export const eventBus: IEventBus = new TypedEventBus();
