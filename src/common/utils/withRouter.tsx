import React from "react";
import { ConnectedComponent } from "react-redux";
import { useParams } from "react-router-dom";

type wrapperType = (props: any) => JSX.Element;

export const withRouter = (Component: typeof React.Component | ConnectedComponent<any, any>):wrapperType => {
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