class Event {

    constructor() {
        this.eventInstances = [];
        this.attach = {}
    }

    create(name, condition, contextProvider) {
        let binds = [];
        this.eventInstances.push({ binds, condition, contextProvider, name });
        this.attach[name] = this.buildAttachobject(binds);
        
        return this;
    }

    buildAttachobject(binds) {
        return {
            to: (elements, handler, antiHandler) => {
                binds.push({ elements, handler, antiHandler });
                return this;
            }
        };
    }

    trigger() {
        this.self = this;
        this.eventInstances.forEach(({ binds, condition, contextProvider }) => {
            var context = contextProvider && contextProvider();
            binds.forEach(({ elements, handler, antiHandler }) =>
                this.invokeBindsHandlers(
                    elements, condition,
                    handler, antiHandler, context
                ));
        });
    }

    invokeBindsHandlers(elements, condition, handler, antiHandler, context) {
        elements.forEach((element) => {
            if(condition(element, context)) {
                handler(element, context);
            } else {
                antiHandler && antiHandler(element, context);
            }
        });
    }

}
