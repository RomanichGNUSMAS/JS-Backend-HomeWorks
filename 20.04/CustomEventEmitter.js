class CustomEventEmitter {
    #emitters;
    constructor() {
        this.#emitters = {};
    }

    on(eventName,listenerFunction) {
        if(!eventName.trim() || typeof listenerFunction !== 'function') throw new TypeError('invalid arguments');
        if (!this.#emitters[eventName]) {
            this.#emitters[eventName] = [];
        }
        this.#emitters[eventName].push(listenerFunction);
    }

    emit(eventName,...args) {
        if(!this.#emitters[eventName]) return false
        return this.#emitters[eventName].forEach(func => func(...args));
    }

    off(eventName,listener) {
        if (!this.#emitters[eventName]) return false;

        const size = this.#emitters[eventName].length;
        this.#emitters[eventName] = this.#emitters[eventName].filter(l => l !== listener);
        
        return this.#emitters[eventName].length !== size;
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
