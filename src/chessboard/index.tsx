import React, { memo, useState } from 'react';
import cls from 'classnames';
import { ChessPieces } from '../utils'
import './index.css';

interface IProps {
    chessboardList: number[][];
    updateChessboard: ({ row, itemNumber }: { row: number; itemNumber: number }) => void;
    doChessboard: ({ preNum, preRow, preItem, row, item, num }: { preNum: number, num: number; preRow: number; preItem: number; row: number; item: number }) => void;
}

// 棋盘
const Chessboard = ({ chessboardList, updateChessboard, doChessboard }: IProps) => {
    const [selectIdx, setSelectIdx] = useState('');

    // 翻开的棋子点机事件
    const fanClick = ({ row, item, num }: { row: number; item: number; num: number }) => {
        // 吃棋子操作
        if (selectIdx) {
            const selectList = selectIdx.split('-');
            doChessboard({ preRow: +selectList[0], preItem: +selectList[1], preNum: +selectList[2], row, item, num});
            setSelectIdx('');
            return;
        }

        if (num === -1) {
            return;
        }
        
        // 点击选中
        setSelectIdx(`${row}-${item}-${num}`);
    };

    return (
        <div className='chessboard-main'>
            {chessboardList.map((row, index) => {
                return (
                    <div className='chessboard-item' key={`chessboard-row-${index}`}>
                        {row.map((item, iIndex) => {
                            // 未翻开的棋子
                            if (item === 0) {
                                return (
                                    <div
                                        key={`chessboard-row-item-${index}-${iIndex}`}
                                        onClick={() => {
                                            setSelectIdx('');
                                            updateChessboard({ row: index, itemNumber: iIndex });
                                        }}
                                        className='chessboard-item-bei chessboard-row-item-animation'>
                                        斗兽棋
                                    </div>
                                );
                            };

                            // 已被吃掉的棋子1
                            if (item === -1) {
                                return (
                                    <div
                                        key={`chessboard-row-item-chi-${index}-${iIndex}`}
                                        className='chessboard-item-chi'
                                        onClick={()=>{ fanClick({ row: index, item: iIndex, num: item }) }}
                                        >
                                        斗兽棋
                                    </div>
                                );
                            };

                            // 是否选中
                            const isSelect = selectIdx === `${index}-${iIndex}-${item}`;
                            // 翻开的棋子
                            return (
                                <img
                                    className={cls(['chessboard-row-item-img', isSelect && 'select-status'])}
                                    src={require(`../images/${item}.jpg`)}
                                    key={`chessboard-row-item-fan-${index}-${iIndex}`}
                                    onClick={() => { fanClick({ row: index, item: iIndex, num: item }) }}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default memo(Chessboard);