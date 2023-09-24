import React from 'react';

function ScoreBoard() {
  const [scoreBoard, setScoreBoard] = React.useState([]);

  React.useEffect(() => {
    const storedScoreBoard = JSON.parse(localStorage.getItem('scoreBoard')) || [];
    setScoreBoard(storedScoreBoard);
  }, []);

  return (
    <div className="p-4">
      <div className="w-auto"> 
        <h2 className="text-2xl font-bold mb-4 underline">Top 5</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full h-16 border-gray-300 border-b py-8">
              <th className="pl-14 text-gray-600 font-normal pr-6 text-left text-sm tracking-wide">Rank</th>
              <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-wide">Name</th>
              <th className="text-gray-600 font-normal pr-6 text-left text-sm tracking-wide">Score</th>
            </tr>
          </thead>
          <tbody>
            {scoreBoard.map((entry, index) => (
              <tr key={index} className="h-24 border-gray-300 border-b">
                <td className="pl-14 text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal">{index + 1}</td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal">{entry.username}</td>
                <td className="text-sm pr-6 whitespace-no-wrap text-gray-800 tracking-normal">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreBoard;

