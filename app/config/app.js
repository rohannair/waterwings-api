module.exports = () => {
  // Configuration Params
  let jwtSecret = 'shared';

  // Getter functions
  return {
    getJWT: () => {
      return jwtSecret
    }
  };
}
