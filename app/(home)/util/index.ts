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
    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    level,
  };

  const map = new window.kakao.maps.Map(container, options);

  return map;
};

export const generateMarker = () => {
  const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

  const marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  return marker;
};

export const getDate = (data: Date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(data);
};
