import React from 'react';

const LoginLayout = ({children}) => {
  return (
    <main className="main">
      <section className="left-side">
        <div className="logo">
          <h1 className="logo__first">Pseudo-SLACK</h1>
          <h3 className="logo__last">anti-messenger</h3>
        </div>
      </section>
      <section className="right-side">
        {children}
      </section>
    </main>
  );
};

export default LoginLayout;
