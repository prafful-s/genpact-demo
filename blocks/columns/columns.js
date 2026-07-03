export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  if (block.closest('main')) {
    block.querySelectorAll('a[href]').forEach((link) => {
      link.classList.add('button', 'primary');
      const paragraph = link.closest('p');
      if (paragraph) paragraph.classList.add('button-wrapper');
    });
  }

  // setup image columns
  [...block.children].forEach((row) => {
    if (row.children.length > 2) row.classList.add('columns-icon-row');

    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}
