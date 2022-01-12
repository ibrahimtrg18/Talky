export const getFirstCharacter = (
  term = '',
  options = { splitter: ' ', joiner: '' },
) => {
  if (typeof term !== 'string') {
    return '';
  }

  const words = term.split(options.splitter);

  const chars = words.map((word) => word.charAt(0));

  return chars.join(options.joiner);
};
