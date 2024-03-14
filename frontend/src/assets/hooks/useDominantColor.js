
import { useEffect, useState } from 'react';
import { useColorThief } from 'color-thief-react';

export const useDominantColor = (src) => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    const useGetColor = async () => {
      const dominantColor = await useColorThief(src);
      setColor(`rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`);
    };
    useGetColor();
  }, [src]);

  return color;
};