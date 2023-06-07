import { useSelector, useDispatch } from 'react-redux';

import { setSelectedIndex } from '../App/AppSlice';
import { RootState } from '../../store';

const History = () => {
  const { history, nfts } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const handleClick = (h: number) => {
    dispatch(setSelectedIndex(h));
  };

  return (
    <div className="absolute bottom-0 left-0 z-10 flex h-16 w-screen items-center overflow-x-scroll bg-slate-600 align-middle">
      <ul className="flex w-full flex-row-reverse justify-center gap-2">
        {history.past.map((h, index) => (
          <li key={index}>
            <img
              className="h-[50px] w-[50px] hover:cursor-pointer"
              src={nfts[h].thumbnailUrl}
              width={50}
              height={50}
              onClick={() => handleClick(h)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
