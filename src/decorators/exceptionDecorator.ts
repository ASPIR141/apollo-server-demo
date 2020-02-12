export const exception = (): MethodDecorator => {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        const className = target.constructor.name;

        const decoratedMethod = async function (this: any, ...args: any[]) {
            try {
                return await method.apply(this, args);
            } catch (error) {
                console.log(JSON.stringify(
                    {
                        class: className,
                        method: propertyKey,
                        error: error.message
                    }
                ));

                throw error;
            }
        };

        descriptor.value = decoratedMethod;
        return descriptor;
    };
};
