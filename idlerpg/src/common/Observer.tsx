interface IObserver {
    update(data: any): void;
}


class Subject {
    private observers: IObserver[] = [];

    registerObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    unregisterObserver(observer: IObserver) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(data: any) {
        this.observers.forEach(observer => observer.update(data));
    }
}