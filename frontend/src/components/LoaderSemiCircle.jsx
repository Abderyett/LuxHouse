import React from 'react';

export function LoaderSemiCircle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: 'auto', background: 'rgb(255, 255, 255)', display: 'block', shapeRendering: 'auto' }}
      width="60px"
      height="60px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#a0aec0"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  );
}
