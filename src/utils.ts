export const ChessPieces = ["鼠", "猫", "狗", "狼", "豹", "虎", "狮", "象"];

/**
 * 初始化棋盘
 * 生成一个 4*4 的二维数组，用于表示棋盘
 * 1-8表示红方，9-16表示蓝方
 * 初始化时所有棋子都是0，代表未翻转
 * -1代表已被吃掉
 */
export const initChessboard = (): number[][] => {
    return new Array(4).fill(null).map(()=> new Array(4).fill(0));
};

/**
 * 获取随机牌
 */
const cardList = [] as number[];
export const getRandomCard = (): number => {
    let num = 0;
    while (cardList.includes(num) || num === 0) {
        num = Math.floor(Math.random() * 16) + 1;
    }

    console.log('===cardList', cardList);
    cardList.push(num);
    return num;
};