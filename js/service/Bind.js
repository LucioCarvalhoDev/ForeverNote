class Bind {
    constructor() {
        throw new Error('Bind não deve ser instanciado');
    }

    static create(model, view, action) {

        let proxy = new Proxy(model, {
            get: function (target, prop, receiver) {

                if (['add', 'reset', 'exclude'].includes(prop)) {

                    return function () {

                        let r = Reflect.apply(target[prop], target, arguments);
                        view.update(target['_data']);
                        return r;
                        
                    }
                } else {
                    return target[prop];
                }

            },

            set: function (target, prop, value, receiver) {

                let r = Reflect.set(target, prop, value, receiver);
                view.update(target['_data']);
                return r;
            }
        });

        return proxy;
    }
}