export const getFontWeight = (weight) => {
  switch (weight) {
    case 100:
      return { fontFamily: 'Inter-Thin' };
    case 200:
      return { fontFamily: 'Inter-ExtraLight' };
    case 300:
      return { fontFamily: 'Inter-Light' };
    case 400:
      return { fontFamily: 'Inter-Regular' };
    case 500:
      return { fontFamily: 'Inter-Medium' };
    case 600:
      return { fontFamily: 'Inter-SemiBold' };
    case 700:
      return { fontFamily: 'Inter-Bold' };
    case 800:
      return { fontFamily: 'Inter-ExtraBold' };
    case 900:
      return { fontFamily: 'Inter-Black' };
    default:
      return { fontFamily: 'Inter' };
  }
};
