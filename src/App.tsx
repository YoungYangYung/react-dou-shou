import React, { useEffect, useState, useCallback } from 'react';
import { message } from 'antd';
import { initChessboard, getRandomCard, ChessPieces } from './utils';
import Chessboard from './chessboard';
import './App.css';

function App() {
  const [chessboardList, setChessboardList] = useState(initChessboard());
  const [messageApi, contextHolder] = message.useMessage();

  // 点机翻牌后更新棋盘
  const updateChessboard = useCallback(({ row, itemNumber }: { row: number; itemNumber: number }) => {
    const num = getRandomCard();
    setChessboardList((pre) => {
      const newChessboardList = JSON.parse(JSON.stringify(pre));
      newChessboardList[row][itemNumber] = num;
      return newChessboardList;
    })
  }, []);

  const doChessboard = useCallback((
    { preNum, preRow, preItem, row, item, num }:
      { preNum: number, num: number; preRow: number; preItem: number; row: number; item: number }) => {
    const presNum = preNum > 8 ? preNum - 8 : preNum;
    const currentNum = num > 8 ? num - 8 : num;

    if (preNum === num) {
      return;
    }

    if (((preNum > 8 && num > 8) || (preNum <= 8 && num <= 8)) && num !== -1) {
      messageApi.open({
        type: 'error',
        content: `不能吃同阵营的棋子～`,
      })
      return;
    }

    if (presNum < currentNum) {
      messageApi.open({
        type: 'error',
        content: `不能吃比自己大的棋子～`,
      })
      return;
    }

    if (Math.abs((preRow - row)) + Math.abs((preItem - item)) !== 1) {
      messageApi.open({
        type: 'error',
        content: `只能吃相邻的棋子～`,
      })
      return;
    }

    setChessboardList((pre) => {
      const newChessboardList = JSON.parse(JSON.stringify(pre));
      newChessboardList[row][item] = preNum;
      newChessboardList[preRow][preItem] = -1;
      return newChessboardList;
    })
  }, [])

  return (
    <div className='main'>
      {contextHolder}
      <Chessboard
        chessboardList={chessboardList}
        updateChessboard={updateChessboard}
        doChessboard={doChessboard}
      />
    </div>
  );
}

export default App;
