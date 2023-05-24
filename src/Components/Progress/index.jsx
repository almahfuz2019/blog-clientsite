import { useNProgress } from "@tanem/react-nprogress";
import React from "react";

import Bar from "./Bar";
import { useRoutes } from "react-router-dom";
import Container from "./Container";

const Progress = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return(
    <Container animationDuration={animationDuration} isFinished={isFinished} >
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  )

};

export default Progress;
