
import React from 'react';

export const useConstructor = (constructorFunction) => {
    const [constructorHasRun, setConstructorHasRun] = React.useState(false);

    const constructor = () => {
        if (constructorHasRun)
            return;
        constructorFunction()
        setConstructorHasRun(true);
    };

    constructor();
}