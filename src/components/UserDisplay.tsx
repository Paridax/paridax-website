import * as React from 'react';
import { Loader } from './Loader';

export const UserDisplay = () => {
    return (
        <div className="flex w-12 h-12 items-center">
            <Loader color="text-gray-900" />
        </div>
    );
};