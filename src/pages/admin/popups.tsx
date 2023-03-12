import useSWR from "swr";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { serverAxios } from "../../utils/commonAxios";
import { getAuthHeader } from "../../utils/auth";
import { authFetcher } from "../../utils/fetcher";
import { Popups } from "../../types/api";

function AdminPopups() {
  const { data, mutate } = useSWR<Popups>(
    "/popups", authFetcher,
  );
  const [index, setIndex] = useState(0);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e?.target?.files) {
      formData.append("file", e.target.files[0]);
    }
    const config = getAuthHeader(document.cookie);
    const res = await serverAxios.post("/files", formData, config);
    await serverAxios.post("/popups", { key: res.data.key }, config);
    await mutate();
  };

  const length = data?.popups.length;

  const deletePopup = async (id: number) => {
    const config = getAuthHeader(document.cookie);
    await serverAxios.delete(`/popups/${id}`, config);
    setIndex(0);
    mutate();
  };

  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-6xl font-bold w-fit">팝업 관리페이지</div>
      <div>현재 팝업이미지</div>
      <div>
        <Image src={`${process.env.NEXT_PUBLIC_ENDPOINT}/files/${data?.popups[index].photoKey}`}
               width={200}
               height={200}
               alt="현재 팝업 이미지" unoptimized={true} />
      </div>
      <div className="flex">
        <button
          type="submit"
          className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl w-fit"
          onClick={() => setIndex(index > 0 ? index - 1 : length! - 1)}
        >
          이전
        </button>
        {length! > 1 && <button
          type="submit"
          className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl w-fit"
          onClick={() => deletePopup(data?.popups[index].id!)}
        >
          삭제
        </button>}
        <button
          type="submit"
          className="p-1 px-2 mr-2 text-white rounded-lg bg-cp-5 hover:shadow-xl w-fit"
          onClick={() => setIndex(index < length! - 1 ? index + 1 : 0)}
        >
          다음
        </button>
      </div>

      <form>
        <div>
          <div>새로운 팝업 이미지를 선택하세요</div>
          <input type="file" onChange={handleChange} />
        </div>
      </form>
    </div>);
}

export default AdminPopups;