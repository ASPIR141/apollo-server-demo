import 'reflect-metadata';

import { Container } from 'inversify';
// import { buildProviderModule } from 'inversify-binding-decorators';
import { bindings } from './bindings';

const createContainer = async () => {
    const container = new Container();

    // container.load(buildProviderModule());
    await container.loadAsync(bindings);

    return container;
};

export const container = createContainer();
