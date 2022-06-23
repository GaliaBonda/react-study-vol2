import React from "react";
import { useParams } from "react-router-dom";

export const withRouter = (Component: typeof React.Component) => {
  const Wrapper = (props: any) => {
    const params = useParams();
    
    return (
      <Component
        params={params}
        {...props}
        />
    );
  };
  
  return Wrapper;
};