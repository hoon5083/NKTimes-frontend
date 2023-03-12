import useSWR from "swr";
import { Popups } from "../../types/api";
import { fetcher } from "../../utils/fetcher";
import Image from "next/image";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleDontShowAgain: () => void;
}

function Popup({ isOpen, onClose, handleDontShowAgain }: Props) {
  const { data } = useSWR<Popups>(
    "/popups", fetcher,
  );
  const [index, setIndex] = useState(0);
  const length = data?.popups.length;
  return (
    <div
      className={`fixed w-fit border-2 h-fit top-20 left-20 z-10 inset-0 overflow-y-auto ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="relative bg-white rounded-lg w-96">
          <div className="p-6 flex flex-col justify-center">
            <Image src={`${process.env.NEXT_PUBLIC_ENDPOINT}/files/${data?.popups[index].photoKey}`}
                   width={400}
                   height={400}
                   alt="현재 팝업 이미지"
                   unoptimized={true} />
            <div className="flex gap-2 my-2 justify-center">
              <button
                type="submit"
                className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl w-fit"
                onClick={() => setIndex(index > 0 ? index - 1 : length! - 1)}
              >
                이전
              </button>
              <button
                type="submit"
                className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl w-fit"
                onClick={() => setIndex(index < length! - 1 ? index + 1 : 0)}
              >
                다음
              </button>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleDontShowAgain}
              >
                오늘 다시 보지 않기
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={onClose}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;