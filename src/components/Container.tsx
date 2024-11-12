import * as React from "react";

import { ReactNode } from "react";

const Container = ({
  children,
  topNav = true,
  centered = false,
  refresh_queries = [],
  paddingBottom = true,
  background = false,
  width = true
}: {
  children: ReactNode,
  topNav?: boolean,
  centered?: boolean,
  refresh_queries?: any[],
  paddingBottom?: boolean,
  background?: boolean,
  width?: boolean
}) =>
{

  return (
    <div className="App">
      <img id="background-image" src="" alt="" />

      <div className={"container-local" + (centered ? " centered" : "") + (width ? " width-larger" : "")}>


        <div className={"container-padding" + (topNav ? " margin" : "") + (centered ? " centered" : "") + (!paddingBottom ? " pb-4" : "") + (background ? " background-active" : "")}>
          <>
            {children}
          </>
        </div>

      </div>

    </div>
  );
};

export default Container;
