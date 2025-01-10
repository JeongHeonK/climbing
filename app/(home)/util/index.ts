export const generateKakaoScript = () => {
  const kakaoMapScript = document.createElement("script");
  kakaoMapScript.async = false;
  kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
  document.head.appendChild(kakaoMapScript);

  return kakaoMapScript;
};

export const generateMap = (id: string, level: number = 5) => {
  const container = document.getElementById(id);
  const options = {
    center: new window.kakao.maps.LatLng(37.5641, 126.997),
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

export const getDate = (data: Date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).format(data);
};
