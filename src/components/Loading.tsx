import React, { FC } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

type TSkeleton = {
  count?: number,
  width?: number,
  height?: number
}

const Loading: FC<{
  isLoading: boolean,
  children?: React.ReactNode,
  width?: number,
  skeleton?: TSkeleton
}> = ({
  isLoading, children, width = 256, skeleton
}) => {
    return (
      <>
        {isLoading ?
          <div style={{ width: '100%', marginTop: 6 }}>
            {skeleton ?
              <SkeletonTheme baseColor="#a29f9f" highlightColor="#f9f9f9">
                <Skeleton {...skeleton} style={{
                  borderRadius: 15,
                  marginBottom: 10
                }} duration={1.3} />
              </SkeletonTheme>
              :
              <div className="w-100 d-flex flex-column align-items-center">
                <img src="/assets/loading.svg" alt="Loading" width={width} />
              </div>
            }
          </div>
          :
          <>{children}</>
        }
      </>
    );
  };


export default Loading