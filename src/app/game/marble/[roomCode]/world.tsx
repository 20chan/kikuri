import { Text } from '@react-three/drei';
import { MarbleCell, board } from '@/lib/games/marble/rule';
import { useMemo, useState } from 'react';

export function World() {
  return (
    <>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[9.4, 0.1, 9.4]} />
        <meshStandardMaterial color="white" opacity={0.5} transparent />
      </mesh>
      {
        board.map((row, y) => {
          return row.map((cell, x) => {
            return (
              <Cell
                key={`${x}-${y}`}
                position={[x, y]}
                cell={cell}
              />
            )
          })
        })
      }
    </>
  )
}

interface CellProps {
  position: [number, number];
  cell: MarbleCell;
  buildOne?: boolean;
  builds?: [boolean, boolean, boolean, boolean, boolean];
}

export function Cell(props: CellProps) {
  const {
    position,
    cell,
    buildOne,
    builds,
  } = props;

  const [hover, setHover] = useState(false);

  const cellWidth = 1.2;

  const coord = useMemo<[number, number, number]>(() => {
    const [axis, index] = position;
    const y = hover ? 0.1 : 0;

    const end = 3.5 + cellWidth / 2;
    if (index === 0) {
      if (axis === 0) {
        return [-end, y, -end];
      }
      return [-end + cellWidth / 2 - 0.5 + axis, y, -end];
    } else if (index === 1) {
      if (axis === 0) {
        return [end, y, -end];
      }
      return [end, y, -end + cellWidth / 2 - 0.5 + axis];
    } else if (index === 2) {
      if (axis === 0) {
        return [end, y, end];
      }
      return [end - cellWidth / 2 + 0.5 - axis, y, end];
    } else {
      if (axis === 0) {
        return [-end, y, end];
      }
      return [-end, y, end - cellWidth / 2 + 0.5 - axis];
    }
  }, [position, hover]);

  const rotation = useMemo<[number, number, number]>(() => {
    const [x, y] = position;
    if (y === 0 || y === 2) {
      return [0, 0, 0];
    } else {
      return [0, Math.PI / 2, 0];
    }
  }, [position]);

  const scale = useMemo(() => {
    const [x, y] = position;
    if (x === 0) {
      return [cellWidth, 0.3, cellWidth] as [number, number, number];
    } else {
      return [0.9, 0.3, cellWidth] as [number, number, number];
    }
  }, [coord]);

  return (
    <>
      <mesh position={coord} rotation={rotation} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
        <boxGeometry args={scale} />
        <meshStandardMaterial color={cell.color} />
        <Text
          color='black'
          position={[0, 0.16, -0.4]}
          rotation={[Math.PI / 2, Math.PI, 0]}
          scale={[0.2, 0.2, 0.2]}
          fontSize={1.1}
          font='https://cdn.0ch.me/fonts/notosanskr/NotoSansKR-Bold.ttf'
          clipRect={[-2, -1, 2, 1]}
        >
          {cell.name}
        </Text>
      </mesh>
    </>
  )
}