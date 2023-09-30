export const getAvatarUrl = (gender: string) => {
  let usrAvatar;
  if (gender === 'M') {
    usrAvatar =
      'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg';
  } else if (gender === 'F') {
    usrAvatar =
      'https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg';
  }
  return usrAvatar;
};
