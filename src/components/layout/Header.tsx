/* Header Component */

import { type FC } from 'react';

const Header: FC = () => {
  return (
    <header className="p-4 border-b border-solid border-gray-700">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold text-white text-center">Ekko API Sandbox</h1>
      </div>
    </header>
  );
};

export default Header;
