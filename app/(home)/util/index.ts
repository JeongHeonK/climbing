import { KakaoMap } from "../types/type";

export const generateKakaoScript = () => {
  const kakaoMapScript: KakaoMap = document.createElement("script");
  kakaoMapScript.async = false;
  kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
  kakaoMapScript.crossorigin = "anonymous";
  document.head.appendChild(kakaoMapScript);

  return kakaoMapScript;
};

export const generateMap = (
  id: string,
  lat: number,
  lng: number,
  level: number = 5,
) => {
  const container = document.getElementById(id);
  const options = {
    center: new window.kakao.maps.LatLng(lat, lng),
    level,
  };

  const map = new window.kakao.maps.Map(container, options);

  return map;
};

export const generateMarker = <T extends { getCenter: () => void }>(map: T) => {
  const marker = new kakao.maps.Marker({
    map,
    position: map.getCenter(),
  });

  return marker;
};

export const loadKakaoAPI = (id: string, lat: number, lng: number) => {
  window.kakao.maps.load(() => {
    const map = generateMap(id, lat, lng);
    const marker = generateMarker(map);

    marker.setMap(map);
  });
};

export const loadKakaoAPIWithForm = (
  id: string,
  lat: number,
  lng: number,
  callback: (lat: string, lng: string) => void,
) => {
  window.kakao.maps.load(() => {
    const map = generateMap(id, lat, lng);
    const marker = generateMarker(map);

    marker.setMap(map);

    kakao.maps.event.addListener(
      map,
      "click",
      <
        T extends {
          latLng: { getLat: () => number; getLng: () => number };
        },
      >(
        mouseEvent: T,
      ) => {
        const latlng = mouseEvent.latLng;

        marker.setPosition(latlng);

        callback(latlng.getLat().toString(), latlng.getLng().toString());
      },
    );
  });
};

export const getDate = (data: Date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(new Date(data));
};
