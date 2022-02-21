import { LoaderLg } from "./Loader";
import * as React from 'react';

export const ProtectedRoute = () => {
    return (
        <div className="flex items-center justify-around h-screen">
            <LoaderLg color="text-primary" />
        </div>
    );
}