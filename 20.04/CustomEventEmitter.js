class CustomEventEmitter {
    #emitters;
    constructor() {
        this.#emitters = {};
    }

    on(emitterName,listenerFunction) {
        if(!emitterName.trim() || typeof listenerFunction !== 'function') throw new TypeError('invalid arguments');
        this.#emitters[emitterName] = listenerFunction;
    }

    emit(eventName,...args) {
        if(!this.#emitters[eventName]) throw new Error('not found')
        return this.#emitters[eventName](...args);
    }

    off(eventName,listener) {
        for(const event in this.#emitters) {
            if(event == eventName && listener === this.#emitters[event]) {
                delete this.#emitters[event];
                return true;
            }
        }
        return false;
    }
}

const service = new CustomEventEmitter();

service.on('start', (user) => {
  console.log(`Service started for ${user}.`);
});

service.on('dataLoaded', (dataCount) => {
  console.log(`Loaded ${dataCount} records.`);
});

service.emit('start', 'Admin'); // Should print "Service started for Admin."
service.emit('dataLoaded', 42); // Should print "Loaded 42 records."
