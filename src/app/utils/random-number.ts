export const generateRandomPosition = () => {
    const maxPosition: number = 650; 
    const x: number = Math.floor(Math.random() * maxPosition);
    const y: number = Math.floor(Math.random() * maxPosition);
    return { x, y };
  };