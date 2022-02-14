import * as React from 'react';
import { Loader } from './Loader';
import { useNavigate } from 'react-router';
import { api_url, web_url } from '../utils/urls';
import { Menu, Transition } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';

export const UserDisplay = () => {
    return (
        <div className="flex w-12 h-12 items-center">
            <Loader color="text-gray-900" />
        </div>
    );
};