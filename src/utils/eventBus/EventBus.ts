import { EUserEvent, noop } from './types';

class EventBus {
  private eventSubscribers: Record<EUserEvent, noop[]> = {
    [EUserEvent.USER_SIGNIN]: [],
    [EUserEvent.USER_SIGNUP]: [],
    [EUserEvent.USER_SIGNOUT]: [],
  };

  public emitEvent = (eventType: EUserEvent) => {
    const subscribers = this.eventSubscribers[eventType];
    subscribers?.forEach((sub) => sub?.());
  };

  public subscribeToEvent = (eventType: EUserEvent, subFn: noop): noop => {
    const subArrLength = this.eventSubscribers[eventType].push(subFn);
    const subscriberIndex = subArrLength - 1;

    const unsubFn = () => {
      this.eventSubscribers[eventType] = this.eventSubscribers[
        eventType
      ].filter((_, index) => index !== subscriberIndex);
    };

    return unsubFn;
  };
}

export const localEventBus = new EventBus();
