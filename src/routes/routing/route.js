import React from 'react';
import { registerRoute } from './utils';

export default function create(path, createComponent, update) {
    let route = createComponent(update);
    registerRoute(update, path);
    return {
        path,
        view(model) {
            return (
                <div>
                    {route.view(model)}
                </div>
            );
        }
    };
}
