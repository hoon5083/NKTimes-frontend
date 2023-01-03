import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

function HomeLunchCard() {
  const today = new Date();
  const date =
    String(today.getFullYear()) +
    String(today.getMonth()) +
    (String(today.getDay()).length === 1 ? "0" + String(today.getDay()) : String(today.getDay()));
  const { data, mutate } = useSWR(
    `https://open.neis.go.kr/hub/mealServiceDietInfo?key=1566a46db98642c29341cfa5206bd3b4&type=json&pIndex=1&pSize=1&MLSV_YMD=${date}&SD_SCHUL_CODE=7010136&ATPT_OFCDC_SC_CODE=B10`,
    fetcher
  );
  const list = data ? data.mealServiceDietInfo?.at(1)?.row.at(0)?.DDISH_NM.split("<br/>") : [];
  return (
    <div className="flex flex-col w-full h-64 mx-2 mb-4 rounded-xl bg-cp-1">
      <div className="w-full px-3 border-b-2 border-black h-1/6">
        <div className="flex justify-between align-bottom">
          <p className="inline-block py-2 text-lg font-bold">오늘의 점심메뉴</p>
          <p className="inline-block py-3 text-sm"></p>
        </div>
      </div>
      {data ? (
        <ul className="px-2 list-none h-5/6">
          {list?.map((menu: string, index: number) => {
            return (
              <li
                key={index}
                className="flex flex-row justify-between px-1 py-1 border-b-2 border-black last:border-0"
              >
                <p>{menu}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        "loading"
      )}
    </div>
  );
}

export default HomeLunchCard;
