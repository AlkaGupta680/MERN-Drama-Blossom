import { useEffect, useState } from 'react';

const FloatingPetals = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const createPetal = () => {
      const petal = {
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.6 + 0.2,
        size: Math.random() * 8 + 4,
      };
      return petal;
    };

    const interval = setInterval(() => {
      setPetals(prev => {
        const newPetals = [...prev, createPetal()];
        return newPetals.slice(-20); // Keep only last 20 petals
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-petals">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.animationDuration}s`,
            opacity: petal.opacity,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingPetals;