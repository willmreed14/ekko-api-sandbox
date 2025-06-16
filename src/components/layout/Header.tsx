/* Header Component */

import { type FC } from 'react';

const Header: FC = () => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold text-white">Ekko API Sandbox</h1>
      </div>
    </header>
  );
};

export default Header;
