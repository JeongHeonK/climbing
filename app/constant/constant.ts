export const REG = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).*$/;

export const SEVEN_DAY = 7 * 24 * 60 * 60 * 1000;

export const ONE_DAY = 1 * 24 * 60 * 60 * 1000;

export const AUTH_ERROR_MESSAGES = {
  email: "유효하지 않은 이메일입니다.",
  reg: "특수문자와 영문이 포함되어야 합니다.",
  min: "비밀번호는 8자리 이상이어야 합니다.",
  max: "비밀번호는 12자리 이하여야 합니다.",
  mismatch: "비밀번호가 일치하지 않습니다.",
  existingEmail: "이미 등록된 이메일입니다.",
  user: "일치하는 계정을 찾을 수 없습니다.",
  pw: "비밀번호가 일치하지 않습니다.",
};

export const GATHERING_ERROR_MESSAGE = {
  descriptionMin: "5자 이상 입력해주세요",
  descriptionMax: "100자 이상 입력하실 수 없습니다.",
  titleMin: "3자 이상 입력해주세요",
  titleMax: "20자 이상 입력할 수 없습니다.",
  location: "위치를 선택해주세요",
  locationDescription: "지점 명을 입력해주세요",
  date: "날짜를 선택해주세요.",
};
