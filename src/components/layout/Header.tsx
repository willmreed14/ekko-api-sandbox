/* Header Component */

import { type FC } from 'react';

const Header: FC = () => {
  return (
    <header className="p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold text-white">Ekko API Sandbox</h1>
      </div>
    </header>
  );
};

export default Header;
