import useSWR from "swr";
import { Popup } from "../../types/api";
import Image from "next/image";
import { ChangeEvent } from "react";
import { serverAxios } from "../../utils/commonAxios";
import { getAuthHeader } from "../../utils/auth";
import { authFetcher } from "../../utils/fetcher";

function AdminPopups() {
  const { data, mutate } = useSWR<Popup>(
    "/popups", authFetcher,
  );
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e?.target?.files) {
      formData.append("file", e.target.files[0]);
    }
    const config = getAuthHeader(document.cookie);
    const res = await serverAxios.post("/files", formData, config);
    console.log(res);
    await serverAxios.post("/popups", { key: res.data.key }, config);
    await mutate();
  };

  return (
    <div className="flex flex-col w-11/12 min-h-screen mx-auto justify-self-center justify-items-center">
      <div className="mx-auto my-10 text-6xl font-bold w-fit">팝업 관리페이지</div>
      <div>현재 팝업이미지</div>
      <div>
        <Image src={`${process.env.NEXT_PUBLIC_ENDPOINT}/files/${data?.photoKey}`}
               width={200}
               height={200}
               alt="현재 팝업 이미지" />
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