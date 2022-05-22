import React from 'react';

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-80 bg-slate-50'>
            <span className="inline-block h-8 w-8 relative">
                <span className="animate-ping absolute h-full w-full rounded-full bg-primary p-3 opacity-90"></span>
                <span className="absolute h-4 w-4 m-2 rounded-full bg-primary opacity-75 animate-pulse z-10"></span>
                <span className="rounded-full h-8 w-8 bg-primary animate-pulse opacity-30"></span>
            </span>
        </div>
    );
};

export default Loader;