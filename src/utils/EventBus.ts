export enum EUserEvent {
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
}

type noop = () => void;

class EventBus {
  private eventSubscribers: Record<EUserEvent, noop[]> = {
    [EUserEvent.USER_LOGIN]: [],
    [EUserEvent.USER_LOGOUT]: [],
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
