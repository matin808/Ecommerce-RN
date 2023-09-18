export const getIdForSpecificProducts = (name: string) => {
  switch (name) {
    case 'Sofa': {
      return 3;
    }

    case 'Cupboards': {
      return 4;
    }

    case 'Tables': {
      return 1;
    }

    case 'Chairs': {
      return 2;
    }

    default: {
      return -1;
    }
  }
};
