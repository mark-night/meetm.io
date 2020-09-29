export const fade = (phase, option) => {
  const duration = (option && option.duration) || 300;
  const opacity = (option && option.opacity) || 1;
  const method = (option && option.method) || 'ease';
  const transition = {
    entering: opacity,
    entered: opacity,
    exiting: 0,
    exited: 0,
  };
  return {
    opacity: transition[phase],
    transition: `opacity ${duration}ms ${method}`,
  };
};
