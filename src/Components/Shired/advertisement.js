import React from 'react';
const Advertisement = () => {
     return (
          <div>
<div className="p-6  py-12 mb-10 bg-primary rounded mt-10">
<div className="container mx-auto">
<div className="flex flex-col lg:flex-row items-center justify-between">
<h2 className="text-center text-5xl md:text-6xl tracking-tighter font-bold text-white">Up to
50% Off
</h2>
<div className="space-x-2 text-xl mt-3 text-center py-2 lg:py-0 text-white">
<span>Plus free shipping! Use code:</span>
<span className="font-bold text-lg">MAMBA</span>
</div>
<a href="https://www.daraz.com.bd/" rel="noreferrer noopener" className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block text-white">Shop Now</a>
</div>
</div>
</div>
          </div>
     );
};
export default Advertisement;