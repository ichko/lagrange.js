class Interactive {

    constructor() {
        this.eventInstances = [];
        this.event = {
            create: (name, condition, contextProvider) => {
                let binds = [];
                this.eventInstances.push({ binds, condition, contextProvider, name });
                this.event.attach[name] = {
                    to: (elements, handler, antiHandler) => binds.push({ elements, handler, antiHandler })
                };
                
                return this;
            },
            attach: {}
        };
    }

    invokeHandlers() {
        this.self = this;
        this.eventInstances.forEach(({ binds, condition, contextProvider }) => {
            var context = contextProvider && contextProvider();
            binds.forEach(({ elements, handler, antiHandler }) => {
                elements.forEach((element) => {
                    if(condition(element, context)) {
                        handler(element, context);
                    } else{
                        antiHandler && antiHandler(element, context);
                    }
                });
            });
        });
    }

}
