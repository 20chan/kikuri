import { Text } from '@react-three/drei';
import { MarbleCell, board, playerColors } from '@/lib/games/marble/marbleRule';
import { useMemo, useState } from 'react';
import { MarbleCellState, MarblePlayerState, MarbleState } from '@/lib/games/marble/marbleState';
import { Vector3 } from '@react-three/fiber';

const cellWidth = 1.2;

function getBoardIndex(position: number): [number, number] {
  const y = Math.floor(position / 8);
  const x = position % 8;
  return [y, x];
}

function getCoord(axis: number, index: number): [number, number, number] {
  const end = 3.5 + cellWidth / 2;
  const y = 0;
  if (axis === 0) {
    if (index === 0) {
      return [-end, y, -end];
    }
    return [-end + cellWidth / 2 - 0.5 + index, y, -end];
  } else if (axis === 1) {
    if (index === 0) {
      return [end, y, -end];
    }
    return [end, y, -end + cellWidth / 2 - 0.5 + index];
  } else if (axis === 2) {
    if (index === 0) {
      return [end, y, end];
    }
    return [end - cellWidth / 2 + 0.5 - index, y, end];
  } else {
    if (index === 0) {
      return [-end, y, end];
    }
    return [-end, y, end - cellWidth / 2 + 0.5 - index];
  }
}

export function World({ state }: { state: MarbleState }) {
  const [hoverCells, setHoverCells] = useState<number[]>([]);

  return (
    <>
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[9.4, 0.1, 9.4]} />
        <meshStandardMaterial color="white" opacity={0.5} transparent />
      </mesh>
      {
        state.players.map((player, i) => {
          return (
            <Player key={i} pid={i} state={player} />
          )
        })
      }
      {
        state.cells.map((cell, i) => {
          const indices = getBoardIndex(i);
          const cellInfo = board[indices[0]][indices[1]];
          return (
            <Cell key={i} position={i} cell={cell} cellInfo={cellInfo} hoverCells={hoverCells} setHoverCells={setHoverCells} />
          )
        })
      }
    </>
  )
}

interface CellProps {
  position: number;
  cell: MarbleCellState;
  cellInfo: MarbleCell;

  hoverCells: number[];
  setHoverCells: (value: number[]) => void;
}

export function Cell(props: CellProps) {
  const {
    position,
    cell,
    cellInfo,
    hoverCells,
    setHoverCells,
  } = props;

  const coord = getCoord(...getBoardIndex(position));
  if (hoverCells[0] === position) {
    coord[1] = 0.1;
  }

  const rotation = useMemo<[number, number, number]>(() => {
    const [y, x] = getBoardIndex(position);
    if (y === 0 || y === 2) {
      return [0, 0, 0];
    } else {
      return [0, Math.PI / 2, 0];
    }
  }, [position]);

  const scale = useMemo(() => {
    const [y, x] = getBoardIndex(position);
    if (x === 0) {
      return [cellWidth, 0.3, cellWidth] as [number, number, number];
    } else {
      return [0.9, 0.3, cellWidth] as [number, number, number];
    }
  }, [position]);

  return (
    <>
      <mesh
        position={coord}
        rotation={rotation}
        receiveShadow
        onPointerEnter={() => setHoverCells([position])}
        onPointerLeave={() => setHoverCells(hoverCells.filter(x => x !== position))}
      >
        <boxGeometry args={scale} />
        <meshStandardMaterial color={cellInfo.color} />
        <Text
          color='black'
          position={[0, 0.16, -0.4]}
          rotation={[Math.PI / 2, Math.PI, 0]}
          scale={[0.2, 0.2, 0.2]}
          fontSize={1.1}
          font='https://cdn.0ch.me/fonts/notosanskr/NotoSansKR-Bold.ttf'
          clipRect={[-2, -1, 2, 1]}
        >
          {cellInfo.name}
        </Text>
      </mesh>
    </>
  )
}

export function Player({ pid, state }: { pid: number, state: MarblePlayerState }) {
  const { position } = state;

  const [x, y, z] = getCoord(Math.floor(position / 8), position % 8);
  const coneCoord = [x, 0.5, z] as Vector3;
  const sphereCoord = [x, 0.7, z] as Vector3;

  const color = playerColors[pid];

  return (
    <>
      <mesh position={coneCoord} castShadow>
        <coneGeometry args={[0.15, 0.8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={sphereCoord} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  )
}