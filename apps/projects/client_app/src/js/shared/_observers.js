export const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;
    switch (entry.target) {
      case document.querySelector('div.megaFilter__center'): {
        // modify filter dropdown's height to maintain static height for filter
        // as a whole UI element
        const dropdown = document.querySelector(
          '.megaFilter__bottom .transition-wrapper'
        );
        const offsetY = dropdown.getBoundingClientRect().y;
        dropdown.style.setProperty(
          '--height',
          `calc(95 * var(--vh) - ${offsetY}px)`
        );
        break;
      }
      case document.querySelector('.carousel__projs__scene'):
        // pass scene width to css for prism calculation
        document
          .querySelector('.carousel__projs__scene')
          .style.setProperty('--scene-width', `${width}px`);
        break;
      case document.documentElement:
        // customized vw/vh to deal with common issue on mobile browsers,
        // where whether viewport size should be changed by display status of
        // other elements (e.g. address bar) is different across vendors.
        entry.target.style.setProperty('--vh', `${height / 100}px`);
        entry.target.style.setProperty('--vw', `${width / 100}px`);
        break;
      default:
        break;
    }
  }
});
