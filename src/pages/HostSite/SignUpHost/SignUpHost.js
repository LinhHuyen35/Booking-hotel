import React from "react";

import SignUp from "module/form/signup";

function SignUpHost({ getData }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignUp role="host" />
    </div>
  );
}

export default SignUpHost;
